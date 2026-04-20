document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const envelope = document.getElementById('envelope');
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const sparklesContainer = document.getElementById('sparkles');
    const scene1 = document.getElementById('scene-1');
    const scene2 = document.getElementById('scene-2');
    const overlay = document.getElementById('transition-overlay');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    
    // Scene 2 Elements
    const title = document.querySelector('.title');
    const polaroids = document.querySelectorAll('.polaroid');
    const typingText = document.getElementById('typing-text');
    const btn = document.getElementById('open-modal-btn');
    const stickers = document.querySelectorAll('.sticker');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');

    // Message for typing effect
    const message = `Selamat ulang tahun... terima kasih sudah hadir dalam hidupku... ❤️`;
    
    let isMusicPlaying = false;

    // --- ENVELOPE INTERACTION ---
    envelopeWrapper.addEventListener('click', () => {
        if (envelope.classList.contains('open')) return;
        
        // Play music on first interaction
        playMusic();

        // Open envelope animation
        envelope.classList.add('open');
        envelopeWrapper.style.animation = 'none'; // Stop idle floating
        
        // Add sparkle effects
        createSparkles();

        // Transition to next scene after 1.5 seconds
        setTimeout(() => {
            transitionToScene2();
        }, 1500);
    });

    function createSparkles() {
        for(let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            // Random position
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            // Random animation delay
            sparkle.style.animationDelay = Math.random() * 0.5 + 's';
            sparklesContainer.appendChild(sparkle);
        }
    }

    // --- TRANSITION ---
    function transitionToScene2() {
        // Zoom in envelope and fade screen to white
        envelopeWrapper.style.transition = 'transform 1s cubic-bezier(0.25, 0.1, 0.25, 1)';
        envelopeWrapper.style.transform = 'scale(5) translateY(20px)';
        overlay.classList.add('active');

        setTimeout(() => {
            // Hide scene 1, show scene 2
            scene1.classList.remove('active');
            scene2.classList.add('active');
            
            // Start Scene 2 animations
            setTimeout(() => {
                overlay.classList.remove('active');
                startScene2Animations();
            }, 500);
            
        }, 1200);
    }

    // --- SCENE 2 ANIMATIONS ---
    function startScene2Animations() {
        // Create floating hearts background
        createFloatingHearts();

        // 1. Show Title
        setTimeout(() => {
            title.classList.add('show');
        }, 500);

        // 2. Show Photos one by one
        polaroids.forEach((polaroid, index) => {
            setTimeout(() => {
                polaroid.classList.add('show');
            }, 1000 + (index * 400));
        });

        // 3. Show Stickers
        stickers.forEach((sticker, index) => {
            setTimeout(() => {
                sticker.classList.add('show');
            }, 2600 + (index * 300));
        });

        // 4. Start Typing Effect for message
        setTimeout(() => {
            typeWriter(message, 0);
            // Add cursor
            typingText.innerHTML += '<span class="cursor"></span>';
        }, 3800);
    }

    function typeWriter(text, i) {
        if (i < text.length) {
            // Remove cursor temporarily to add text
            const currentHTML = typingText.innerHTML.replace('<span class="cursor"></span>', '');
            
            if (text.charAt(i) === '\n') {
                typingText.innerHTML = currentHTML + '<br><span class="cursor"></span>';
            } else {
                typingText.innerHTML = currentHTML + text.charAt(i) + '<span class="cursor"></span>';
            }
            
            // Randomize typing speed slightly for realism
            const speed = Math.random() * 30 + 30; 
            setTimeout(() => typeWriter(text, i + 1), speed);
        } else {
            // Typing finished, remove cursor after a delay
            setTimeout(() => {
                typingText.innerHTML = typingText.innerHTML.replace('<span class="cursor"></span>', '');
                // 5. Show button
                btn.classList.add('show');
            }, 1000);
        }
    }

    function createFloatingHearts() {
        const container = document.querySelector('.floating-hearts');
        const heartIcons = ['❤️', '💖', '💕', '✨', '🌸'];
        
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 8 + 8) + 's'; // 8-16s
            heart.style.fontSize = (Math.random() * 15 + 15) + 'px'; // 15-30px
            container.appendChild(heart);
            
            // Cleanup
            setTimeout(() => {
                heart.remove();
            }, 16000);
        }, 600); // New heart every 600ms
    }

    // --- MODAL INTERACTION ---
    btn.addEventListener('click', () => {
        modal.classList.add('show');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // --- MUSIC CONTROL ---
    function playMusic() {
        bgMusic.volume = 0.5; // Set volume slightly lower
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicBtn.classList.add('playing');
        }).catch(err => {
            console.log("Audio autoplay failed:", err);
            // Browser might block autoplay without explicit interaction
        });
    }

    musicBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
        } else {
            bgMusic.play();
            musicBtn.classList.add('playing');
        }
        isMusicPlaying = !isMusicPlaying;
    });
});
