
function toast({
    title = '',
    message = '',
    type = 'error',
    duration = 3000
}){
    const toasts = document.getElementById('toasts');
    const icons = {
        success: 'fas fa-check-circle',
        warning: 'fas fa-exclamation-circle',
        fail: 'fa-solid fa-triangle-exclamation'
    };
    const icon = icons[type];
    const toast = document.createElement('div');
    toast.classList.add('toast', `${type}`);
    toast.innerHTML = `
    <div><i class="i ${icon}"></i></div>
    <div class="text">
        <p class="p1">${title}</p>
        <p class="p2">${message}</p>
    </div>
    <div class="close"><i class="fa-solid fa-xmark"></i></div>
    `;

    const removetimeout = setTimeout(() => {
        toasts.removeChild(toast);
    }, duration);

    toast.onclick = function(e){
        if(e.target.closest('.close')){
            toasts.removeChild(toast);
            clearTimeout(removetimeout);
        }
    }

    toasts.appendChild(toast);
}

