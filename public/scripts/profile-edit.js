let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dxgw2lspw/upload';
let CLOUDINARY_UPLOAD_PRESET = 'i3dhuxyx';

let imgPreview = document.getElementById('mk-image-preview');
let fileUpload = document.getElementById('mk-image-upload');
let imageUrl = document.getElementById('mk-image-url');

fileUpload.addEventListener('change', function (event) {
    let file = event.target.files[0];
    let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then(res => {
        console.log(res);
        imageUrl.value = res.data.secure_url;
        imgPreview.src = res.data.secure_url;
    }).catch(err => {
        console.error(err);
    });
});