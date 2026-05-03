document.addEventListener('DOMContentLoaded', () => {
    // Kích hoạt menu đang được chọn
    const currentPage = window.location.pathname.split("/").pop() || 'index.html';
    document.querySelectorAll('#main-nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active-link');
    });

    const container = document.getElementById('sections-container');
    const sections = document.querySelectorAll('.section');
    const totalSections = sections.length;
    let currentIndex = 0;
    let isScrolling = false; 

    function scrollToSection(index) {
        if (index < 0 || index >= totalSections) return;
        isScrolling = true;
        currentIndex = index;
        container.style.transform = `translateY(-${currentIndex * 100}vh)`;
        
        sections.forEach((sec, i) => {
            if(i === currentIndex) sec.classList.add('active');
            else sec.classList.remove('active');
        });

        handleAnimations(currentIndex);
        setTimeout(() => { isScrolling = false; }, 1000); 
    }

    function handleAnimations(index) {
        sections.forEach((sec, i) => {
            const isCurrent = (i === index);
            if (sec.classList.contains('card-section')) {
                const cardImg = sec.querySelector('.card-img');
                const watchImg = sec.querySelector('.watch-img');
                const targetSrc = watchImg.getAttribute('data-target');
                if (isCurrent) {
                    watchImg.src = 'img/sp.png';
                    watchImg.classList.remove('flash');
                    setTimeout(() => {
                        cardImg.classList.add('scanning');
                        setTimeout(() => {
                            watchImg.src = targetSrc;
                            watchImg.classList.add('flash');
                            setTimeout(() => { cardImg.classList.remove('scanning'); }, 600);
                        }, 600); 
                    }, 800); 
                } else {
                    cardImg.classList.remove('scanning');
                    watchImg.classList.remove('flash');
                    watchImg.src = 'img/sp.png';
                }
            }
            if (sec.id === 'sec-simulation') {
                const radar = document.getElementById('radar');
                if (radar) {
                    if (isCurrent) setTimeout(() => radar.classList.add('active-waves'), 600);
                    else radar.classList.remove('active-waves');
                }
            }
        });
    }

    window.addEventListener('wheel', (e) => {
        if (isScrolling) return; 
        if (e.deltaY > 0) scrollToSection(currentIndex + 1);
        else scrollToSection(currentIndex - 1); 
    }, { passive: false });

    window.addEventListener('keydown', (e) => {
        if (isScrolling) return;
        if (e.key === 'ArrowDown') scrollToSection(currentIndex + 1);
        else if (e.key === 'ArrowUp') scrollToSection(currentIndex - 1);
    });
    
    if(sections.length > 0) sections[0].classList.add('active');
    // --- BẬT / TẮT ÂM THANH CHO VIDEO LỚN ---
    const mainVideo = document.getElementById('main-video');
    const muteBtn = document.getElementById('mute-toggle');
    
    if (mainVideo && muteBtn) {
        muteBtn.addEventListener('click', () => {
            mainVideo.muted = !mainVideo.muted;
            if (mainVideo.muted) {
                muteBtn.innerHTML = '🔇 Bật âm thanh';
                muteBtn.style.background = 'rgba(0, 0, 0, 0.6)';
                muteBtn.style.color = '#fff';
            } else {
                muteBtn.innerHTML = '🔊 Tắt âm thanh';
                muteBtn.style.background = 'rgba(0, 255, 204, 0.8)';
                muteBtn.style.color = '#000';
            }
        });
    }
});