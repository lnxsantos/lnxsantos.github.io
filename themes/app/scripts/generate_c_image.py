#!/usr/bin/env python3

import sys
from PIL import Image, ImageDraw, ImageFont
import os

def desenhar_codigo(draw, x, y, largura, altura, cor="#60a5fa"):
    """Desenha um bloco de código C simplificado"""
    draw.rectangle([x, y, x + largura, y + altura], 
                   fill="#1e293b", outline=cor, width=2)
    
    linhas_codigo = [
        "#include <stdio.h>",
        "int main() {",
        "    printf(\"Hello\");",
        "    return 0;",
        "}"
    ]
    
    try:
        font_code = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf", 14)
    except:
        try:
            font_code = ImageFont.truetype("consolas.ttf", 14)
        except:
            font_code = ImageFont.load_default()
    
    y_line = y + 15
    for i, linha in enumerate(linhas_codigo[:4]):
        if linha.strip().startswith("#include") or linha.strip().startswith("int") or linha.strip().startswith("return"):
            cor_texto = "#60a5fa"
        elif '"' in linha:
            cor_texto = "#22c55e"
        else:
            cor_texto = "#e2e8f0"
        
        draw.text((x + 10, y_line), linha, fill=cor_texto, font=font_code)
        y_line += 25

def criar_c_image(titulo, descricao, output_path):
    """
    Cria uma imagem Open Graph (1200x630px) com elementos de código C.
    """
    largura, altura = 1200, 630
    img = Image.new('RGB', (largura, altura), color="#0f172a")
    draw = ImageDraw.Draw(img)
    
    for y in range(altura):
        r = int(15 + (y / altura) * 20)
        g = int(23 + (y / altura) * 25)
        b = int(42 + (y / altura) * 30)
        draw.line([(0, y), (largura, y)], fill=(r, g, b))
    
    try:
        font_titulo = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 56)
        font_desc = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 28)
    except:
        try:
            font_titulo = ImageFont.truetype("arial.ttf", 56)
            font_desc = ImageFont.truetype("arial.ttf", 28)
        except:
            font_titulo = ImageFont.load_default()
            font_desc = ImageFont.load_default()
    
    codigo_x = 60
    codigo_y = 120
    codigo_largura = 400
    codigo_altura = 180
    desenhar_codigo(draw, codigo_x, codigo_y, codigo_largura, codigo_altura)
    
    try:
        font_c = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 80)
    except:
        try:
            font_c = ImageFont.truetype("arial.ttf", 80)
        except:
            font_c = ImageFont.load_default()
    
    draw.text((codigo_x + 150, codigo_y + codigo_altura + 20), 
              "C", fill="#60a5fa", font=font_c)
    
    texto_x = codigo_x + codigo_largura + 80
    texto_y = 180
    
    palavras = titulo.split()
    linha1 = ""
    linha2 = ""
    linha3 = ""
    
    for palavra in palavras:
        teste_linha = linha1 + " " + palavra if linha1 else palavra
        bbox = draw.textbbox((0, 0), teste_linha, font=font_titulo)
        largura_texto = bbox[2] - bbox[0]
        
        if largura_texto < (largura - texto_x - 80) and not linha2:
            linha1 = teste_linha
        else:
            if not linha2:
                teste_linha2 = palavra
                bbox2 = draw.textbbox((0, 0), teste_linha2, font=font_titulo)
                largura_texto2 = bbox2[2] - bbox2[0]
                if largura_texto2 < (largura - texto_x - 80):
                    linha2 = palavra
                else:
                    linha3 = palavra
            elif not linha3:
                teste_linha3 = linha2 + " " + palavra
                bbox3 = draw.textbbox((0, 0), teste_linha3, font=font_titulo)
                largura_texto3 = bbox3[2] - bbox3[0]
                if largura_texto3 < (largura - texto_x - 80):
                    linha2 = teste_linha3
                else:
                    linha3 = palavra
                else:
                    linha3 += " " + palavra
    
    if linha1:
        draw.text((texto_x, texto_y), linha1, fill="#ffffff", font=font_titulo)
    if linha2:
        draw.text((texto_x, texto_y + 70), linha2, fill="#ffffff", font=font_titulo)
    if linha3:
        draw.text((texto_x, texto_y + 140), linha3, fill="#ffffff", font=font_titulo)
    
    y_desc = texto_y + 220
    desc_truncada = descricao[:120] + "..." if len(descricao) > 120 else descricao
    
    palavras_desc = desc_truncada.split()
    linha_desc1 = ""
    linha_desc2 = ""
    
    for palavra in palavras_desc:
        teste_linha = linha_desc1 + " " + palavra if linha_desc1 else palavra
        bbox = draw.textbbox((0, 0), teste_linha, font=font_desc)
        largura_texto = bbox[2] - bbox[0]
        
        if largura_texto < (largura - texto_x - 80) and not linha_desc2:
            linha_desc1 = teste_linha
        else:
            if not linha_desc2:
                linha_desc2 = palavra
            else:
                break
    
    if linha_desc1:
        draw.text((texto_x, y_desc), linha_desc1, fill="#d1d5db", font=font_desc)
    if linha_desc2:
        draw.text((texto_x, y_desc + 40), linha_desc2, fill="#d1d5db", font=font_desc)
    
    try:
        font_symbols = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 40)
    except:
        try:
            font_symbols = ImageFont.truetype("arial.ttf", 40)
        except:
            font_symbols = ImageFont.load_default()
    
    draw.text((largura - 150, 100), "{", fill="#3b82f6", font=font_symbols)
    draw.text((largura - 100, 150), "}", fill="#3b82f6", font=font_symbols)
    draw.text((largura - 200, 200), "()", fill="#22c55e", font=font_symbols)
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, "PNG", optimize=True)
    print(f"✅ Imagem criada: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Uso: python3 generate_c_image.py 'Título' 'Descrição' output.png")
        print("\nExemplo:")
        print("  python3 generate_c_image.py 'Conceitos C' 'Descrição' static/images/posts/conceitos-c.png")
        sys.exit(1)
    
    titulo = sys.argv[1]
    descricao = sys.argv[2]
    output = sys.argv[3]
    
    criar_c_image(titulo, descricao, output)
    print(f"\n📸 Imagem gerada com sucesso!")
    print(f"   Tamanho: 1200x630px")
    print(f"   Arquivo: {output}")

