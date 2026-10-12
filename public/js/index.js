const fileInput = document.getElementById('fileInput');
const fileInputed = document.querySelector('.file-inputed');

    // 1. ОТДЕЛЬНО: Отслеживаем выбор файла (сработает сразу, как пользователь выберет файл)
    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            fileInputed.textContent = `Выбрано файлов: ${fileInput.files.length}`;
        } else {
            fileInputed.textContent = ''; // Очищаем текст, если пользователь сбросил выбор
        }
    });


    document.getElementById('uploadForm').addEventListener('submit', async (e) => {
        e.preventDefault();


        const fileInput = document.getElementById('fileInput');
                    
        if (!fileInput.files.length) return;



        const formData = new FormData();
        formData.append('image', fileInput.files[0]);
        // Array.from(fileInput.files).forEach((file) => {
        //     formData.append('image[]', file); 
        // });

        try {
            const response = await fetch('/convert', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Ошибка сети или сервера');

            // Получаем имя файла из заголовков ответа
            const disposition = response.headers.get('Content-Disposition');
            let filename = 'converted.jpg';
            if (disposition && disposition.indexOf('attachment') !== -1) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                const matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1]) { 
                    filename = decodeURIComponent(matches[1].replace(/['"]/g, ''));
                }
                
            }

            // Скачиваем полученный блоб (файл)
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
          
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            fileInputed.textContent = '';

        } catch (error) {
            alert('Произошла ошибка: ' + error.message);
        }
    });