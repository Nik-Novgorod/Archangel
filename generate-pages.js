const fs = require('fs');
const path = require('path');

const records = [
    { fullName: 'Абрамов Василий Васильевич', worker: "монах", description: 'Работник отдела продаж' },
    { fullName: 'Петров Петр Петрович', worker: "прихожанин", description: 'Инженер по качеству' },
    { fullName: 'Сидорова Мария Алексеевна', worker: "протоиерей", description: 'Бухгалтер' },
    { fullName: 'Кузнецов Алексей Викторович', worker: "архиепископ", description: 'Дизайнер' },
];

const template = fs.readFileSync('template.html', 'utf8');

records.forEach(record => {
    const fileName = generateFileName(record.fullName) + '.html';
    let content = template;
    
    // Заменяем плейсхолдеры
    content = content.replace('{{fullName}}', record.fullName)
                    .replace('{{worker}}', record.worker)
                    .replace('{{description}}', record.description);
    
    fs.writeFileSync(fileName, content);
});

function generateFileName(fullName) {
    return fullName.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^а-яёa-z0-9-]/g, '');
}