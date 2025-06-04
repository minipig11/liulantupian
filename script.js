// 获取URL参数
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// 检查文件是否为图片
function isImageFile(filename) {
    return /\.(jpg|jpeg|png|gif)$/i.test(filename);
}

// 初始化页面
function initPage() {
    // 检查imageList是否已定义
    if (typeof imageList === 'undefined') {
        console.error('图片列表未加载，请确保v0list.js已正确加载');
        return;
    }

    // 检查当前页面
    if (document.getElementById('imageGrid')) {
        // 在首页显示图片列表
        const imageGrid = document.getElementById('imageGrid');
        imageList.forEach(image => {
            const imageItem = document.createElement('div');
            imageItem.className = 'image-item';
            const isImage = isImageFile(image.name);
            imageItem.innerHTML = `
                <a href="view.html?image=${encodeURIComponent(image.name)}">
                    <img src="images/${image.name}" alt="${image.title}" 
                         class="${isImage ? 'image-preview' : ''}"
                         ${isImage ? 'data-image="true"' : ''}>
                </a>
            `;
            imageGrid.appendChild(imageItem);
        });
    } else if (document.getElementById('mainImage')) {
        // 在查看页面显示单张图片
        const imageName = getUrlParameter('image');
        if (imageName) {
            const mainImage = document.getElementById('mainImage');
            mainImage.src = `images/${imageName}`;
            mainImage.alt = imageName;
            
            // 如果是图片，添加特殊类名
            if (isImageFile(imageName)) {
                mainImage.classList.add('image-preview');
                mainImage.setAttribute('data-image', 'true');
            }
            
            document.title = `查看图片 - ${imageName}`;
        } else {
            // 如果没有图片参数，返回首页
            window.location.href = 'index.html';
        }
    }
}

// 确保v0list.js加载完成后再初始化页面
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
} 