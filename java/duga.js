(function () {
    const wrapper = document.getElementById('arcWrapper');
    if (!wrapper) return;

    let isDragging = false;
    let startX = 0;

    // Храним текущий угол в градусах (число), а не в строке
    let currentRotation = 0;

    // 1. Начало перетаскивания
    function onMouseDown(e) {
        isDragging = true;
        startX = e.clientX;

        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'grabbing';
    }

    // 2. Движение мыши
    function onMouseMove(e) {
        if (!isDragging) return;

        e.preventDefault();

        const currentX = e.clientX;
        const deltaX = currentX - startX;

        // Чувствительность: 0.5 градуса за 1 пиксель
        const rotationStep = deltaX * 0.5;

        // Обновляем накопленный угол
        currentRotation += rotationStep;

        // ВАЖНО: Меняем только CSS-переменную, а не transform напрямую!
        // Браузер сам пересчитает transform: rotate(var(--global-rotate))
        // и применит компенсацию к карточкам через их CSS.
        wrapper.style.setProperty('--global-rotate', currentRotation + 'deg');

        // Обновляем стартовую точку
        startX = currentX;
    }

    // 3. Конец перетаскивания
    function onMouseUp() {
        if (isDragging) {
            isDragging = false;
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        }
    }

    // Вешаем слушатели для мыши
    wrapper.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // Поддержка для телефонов (тачскрин)
    wrapper.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches.clientX;
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'grabbing';
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const currentX = e.touches.clientX;
        const deltaX = currentX - startX;
        const rotationStep = deltaX * 0.5;

        currentRotation += rotationStep;

        // То же самое для тач-событий: меняем переменную
        wrapper.style.setProperty('--global-rotate', currentRotation + 'deg');

        startX = currentX;
    }, { passive: false });

    document.addEventListener('touchend', () => {
        if (isDragging) {
            isDragging = false;
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        }
    });
})();