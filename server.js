const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

const app = express();
const PORT = 4000;

// Настройка multer для хранения файла в памяти (buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Отдаем статическую страницу фронтенда
app.use(express.static('public'));
 
// Эндпоинт для конвертации
app.post('/convert', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('Файл не загружен.');
        }

        // Конвертируем буфер изображения в JPEG с помощью sharp
        // const jpegBuffer = await sharp(req.file.buffer)
        //     .jpeg({ quality: 90 }) // Можно настроить качество от 1 до 100
        //     .toBuffer();

        // // Формируем имя для скачивания (меняем расширение на .jpg)
        // const originalName = path.parse(req.file.originalname).name;
        // const newFileName = `${originalName}.jpg`;

        // // Отправляем файл обратно пользователю
        // res.setHeader('Content-Type', 'image/jpeg');
        // res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(newFileName)}"`);
        // res.send(jpegBuffer);


        // 1. Конвертируем буфер изображения в WebP с помощью sharp
        const webpBuffer = await sharp(req.file.buffer)
            .webp({ quality: 80 }) // Для WebP качество 80 обычно является оптимальным
            .toBuffer();

        // 2. Формируем имя для скачивания (меняем расширение на .webp)
        const originalName = path.parse(req.file.originalname).name;
        const newFileName = `${originalName}.webp`;

        // 3. Отправляем WebP файл обратно пользователю
        res.setHeader('Content-Type', 'image/webp'); // Меняем MIME-тип
        res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(newFileName)}"`);
        res.send(webpBuffer);

    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка при конвертации изображения.');
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
