{
    let walletCode = document.querySelector('[data-wallet-code]');
    if(walletCode) {
        let code = walletCode.querySelector('.wallet-code__code');
        let btnCopy = walletCode.querySelector('.wallet-code__copy');

        btnCopy.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(code.innerText);
            btnCopy.classList.add('copied');

            setTimeout(() => {
                btnCopy.classList.remove('copied');
            }, 1000)
        })
    }
}