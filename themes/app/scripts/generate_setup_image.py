#!/usr/bin/env python3

import sys
from PIL import Image, ImageDraw, ImageFont
import os

def desenhar_laptop(draw, x, y, largura, altura, cor="#60a5fa"):
    """Desenha um laptop/notebook simplificado"""
    draw.rectangle([x, y + altura*0.6, x + largura, y + altura], 
                   fill=cor, outline="#2563eb", width=3)
    
    tela_altura = altura * 0.5
    draw.rectangle([x + largura*0.1, y, x + largura*0.9, y + tela_altura],
                   fill="#1f2937", outline="#60a5fa", width=3)
    
    draw.rectangle([x + largura*0.12, y + tela_altura*0.05, 
                    x + largura*0.88, y + tela_altura*0.95],
                   outline="#60a5fa", width=2)
    
    for i in range(5):
        y_tecla = y + altura*0.65 + i * (altura*0.3 / 6)
        draw.line([x + largura*0.15, y_tecla, x + largura*0.85, y_tecla],
                 fill="#3b82f6", width=2)
    
    trackpad_y = y + altura*0.75
    draw.ellipse([x + largura*0.35, trackpad_y,
                  x + largura*0.65, trackpad_y + altura*0.15],
                 outline="#2563eb", width=2)
    
    draw.ellipse([x + largura*0.45, y + tela_altura*0.95,
                  x + largura*0.55, y + tela_altura*1.05],
                 fill="#2563eb", outline="#1d4ed8", width=2)

def criar_setup_image(titulo, descricao, output_path):
    """
    Cria uma imagem Open Graph (1200x630px) com laptop e informações do post.
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
    
    laptop_x = 60
    laptop_y = 120
    laptop_largura = 300
    laptop_altura = 200
    desenhar_laptop(draw, laptop_x, laptop_y, laptop_largura, laptop_altura)
    
    try:
        font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 20)
    except:
        try:
            font_small = ImageFont.truetype("arial.ttf", 20)
        except:
            font_small = ImageFont.load_default()
    
    draw.text((laptop_x + 80, laptop_y + laptop_altura + 20), 
              "ThinkPad X230", fill="#60a5fa", font=font_small)
    draw.text((laptop_x + 100, laptop_y + laptop_altura + 45), 
              "Fedora Linux", fill="#93c5fd", font=font_small)
    
    texto_x = laptop_x + laptop_largura + 80
    texto_y = 180
    
    palavras = titulo.split()
    linha1 = ""
    linha2 = ""
    
    for palavra in palavras:
        teste_linha = linha1 + " " + palavra if linha1 else palavra
        bbox = draw.textbbox((0, 0), teste_linha, font=font_titulo)
        largura_texto = bbox[2] - bbox[0]
        
        if largura_texto < (largura - texto_x - 80) and not linha2:
            linha1 = teste_linha
        else:
            if not linha2:
                linha2 = palavra
            else:
                linha2 += " " + palavra
    
    if linha1:
        draw.text((texto_x, texto_y), linha1, fill="#ffffff", font=font_titulo)
    if linha2:
        draw.text((texto_x, texto_y + 70), linha2, fill="#ffffff", font=font_titulo)
    
    y_desc = texto_y + 160
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
    
    for i in range(3):
        y_line = 50 + i * 20
        draw.line([(largura - 200, y_line), (largura - 50, y_line)], 
                 fill="#3b82f6", width=2)
        draw.text((largura - 190, y_line - 8), "$ ", fill="#22c55e", font=font_small)
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, "PNG", optimize=True)
    print(f"✅ Imagem criada: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Uso: python3 generate_setup_image.py 'Título' 'Descrição' output.png")
        print("\nExemplo:")
        print("  python3 generate_setup_image.py 'Meu Setup' 'Descrição' static/images/posts/setup.png")
        sys.exit(1)
    
    titulo = sys.argv[1]
    descricao = sys.argv[2]
    output = sys.argv[3]
    
    criar_setup_image(titulo, descricao, output)
    print(f"\n📸 Imagem de setup gerada com sucesso!")
    print(f"   Tamanho: 1200x630px")
    print(f"   Arquivo: {output}")

