#!/usr/bin/env python3

import sys
from PIL import Image, ImageDraw, ImageFont
import os

def criar_og_image(titulo, descricao, output_path, cor_fundo="#2563eb", cor_texto="#ffffff"):
    """
    Cria uma imagem Open Graph (1200x630px) com título e descrição.
    
    Args:
        titulo: Título do post
        descricao: Descrição do post
        output_path: Caminho para salvar a imagem
        cor_fundo: Cor de fundo (hex)
        cor_texto: Cor do texto (hex)
    """
    largura, altura = 1200, 630
    img = Image.new('RGB', (largura, altura), color=cor_fundo)
    draw = ImageDraw.Draw(img)
    
    try:
        font_titulo = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 64)
        font_desc = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 32)
    except:
        try:
            font_titulo = ImageFont.truetype("arial.ttf", 64)
            font_desc = ImageFont.truetype("arial.ttf", 32)
        except:
            font_titulo = ImageFont.load_default()
            font_desc = ImageFont.load_default()
    
    padding_x = 80
    padding_y = 60
    
    y_titulo = 200
    palavras = titulo.split()
    linha1 = ""
    linha2 = ""
    
    for palavra in palavras:
        teste_linha = linha1 + " " + palavra if linha1 else palavra
        bbox = draw.textbbox((0, 0), teste_linha, font=font_titulo)
        largura_texto = bbox[2] - bbox[0]
        
        if largura_texto < (largura - 2 * padding_x) and not linha2:
            linha1 = teste_linha
        else:
            if not linha2:
                linha2 = palavra
            else:
                linha2 += " " + palavra
    
    if linha1:
        draw.text((padding_x, y_titulo), linha1, fill=cor_texto, font=font_titulo)
    
    if linha2:
        draw.text((padding_x, y_titulo + 80), linha2, fill=cor_texto, font=font_titulo)
    
    y_desc = y_titulo + 180
    desc_truncada = descricao[:100] + "..." if len(descricao) > 100 else descricao
    
    palavras_desc = desc_truncada.split()
    linha_desc1 = ""
    linha_desc2 = ""
    
    for palavra in palavras_desc:
        teste_linha = linha_desc1 + " " + palavra if linha_desc1 else palavra
        bbox = draw.textbbox((0, 0), teste_linha, font=font_desc)
        largura_texto = bbox[2] - bbox[0]
        
        if largura_texto < (largura - 2 * padding_x) and not linha_desc2:
            linha_desc1 = teste_linha
        else:
            if not linha_desc2:
                linha_desc2 = palavra
            else:
                break
    
    if linha_desc1:
        draw.text((padding_x, y_desc), linha_desc1, fill=cor_texto, font=font_desc)
    if linha_desc2:
        draw.text((padding_x, y_desc + 45), linha_desc2, fill=cor_texto, font=font_desc)
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, "PNG", optimize=True)
    print(f"✅ Imagem criada: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Uso: python3 generate_og_image.py 'Título' 'Descrição' output.png")
        print("\nExemplo:")
        print("  python3 generate_og_image.py 'Meu Post' 'Descrição do post' static/images/posts/post.png")
        sys.exit(1)
    
    titulo = sys.argv[1]
    descricao = sys.argv[2]
    output = sys.argv[3]
    
    criar_og_image(titulo, descricao, output)
    print(f"\n📸 Imagem Open Graph gerada com sucesso!")
    print(f"   Tamanho: 1200x630px")
    print(f"   Arquivo: {output}")

