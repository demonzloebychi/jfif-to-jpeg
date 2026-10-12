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