function mudarImg(imagem, texto){
    imagem.addEventListener('mouseover', () => {
        imagem.src = 'aberta.jpg'
        texto.textContent = 'Janela aberta'
    })

    imagem.addEventListener('mouseout', () => {
        imagem.src = 'fechada.jpg'
        texto.textContent = 'Janela fechada'
    })

    imagem.addEventListener('click', () => {
        imagem.src = 'quebrada.jpg'
        texto.textContent = 'Janela quebrada'
    })
}