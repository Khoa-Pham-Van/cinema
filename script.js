// Dữ liệu chi tiết các phòng
const scenes = {
    lobby: {
        title: "CGV Main Lobby",
        description: "Welcome to CGV's spectacular main lobby featuring modern architectural design and premium amenities. Experience the grand entrance with our photo gallery showcasing our state-of-the-art facilities.",
        type: "slideshow",
        slideshowId: "lobby-slideshow",
        specs: [
            { value: "250m²", label: "Total Area" },
            { value: "6", label: "Service Counters" },
            { value: "60+", label: "Waiting Seats" },
            { value: "4K", label: "Screens" }
        ],
        features: [
            "Spacious lobby with 5-meter high ceiling and open-concept design",
            "Modern automated ticketing system with 8 self-service kiosks",
            "Comfortable waiting area with premium sofas and lounge chairs",
            "Premium concession stand with gourmet snacks and beverages",
            "Energy-efficient LED lighting system with smart controls",
            "Hollywood-inspired interior design with celebrity artwork displays"
        ],
        hasSeating: false,
        experienceText: "Experience CGV Premium Cinema:",
        cinemaLocations: [
            "CGV Sư Vạn Hạnh",
            "CGV Aeon Bình Tân",
            "CGV SC Vivo City",
            "CGV Vincom Center Landmark 81",
            "CGV Vincom Metropolis Liễu Giai",
            "CGV Aeon Hà Đông"
        ]
    },
    cinema1: {
        title: "IMAX",
        description: "The world's most immersive movie experience, powered by a combination of the most advanced technology, IMAX will take you from the edge of your seat to the edge of reality. Experience crystal-clear images and powerful surround sound.",
        type: "video",
        videoId: "iDSXSsDyvfc",
        specs: [
            { value: "440", label: "Seats" },
            { value: "4K Laser", label: "Resolution" },
            { value: "Dolby Atmos", label: "Sound System" },
            { value: "21m", label: "Screen Size" }
        ],
        features: [
            "Floor-to-ceiling, wall-to-wall curved large-format screen for immersive viewing.",
            "Dual 4K laser projection system ensures ultra-bright, razor-sharp images.",
            "IMAX® with Laser technology enhances color, contrast, and clarity.",
            "Precision-tuned surround sound delivers crystal-clear, powerful audio.",
            "Comfortable stadium-style seating for optimal viewing from every angle.",
        ],
        hasSeating: true,
        seatingCapacity: 120,
        experienceText: "Experience IMAX® at CGV:",
        cinemaLocations: [
            "CGV Sư Vạn Hạnh",
            "CGV Aeon Bình Tân",
            "CGV SC Vivo City",
            "CGV Vincom Center Landmark 81",
            "CGV Vincom Metropolis Liễu Giai",
            "CGV Aeon Hà Đông"
        ]
    },
    cinema2: {
        title: "ULTRA 4DX",
        description: "ScreenX expands the main screen beyond the frame onto two side-walls until the last row of seats. Pairing with unique multi-sensory effects of 4DX: motion seats, bubbles, wind, scent, lighting for the ultimate immersive experience.",
        type: "video",
        videoId: "RQqvWAKhyy0",
        specs: [
            { value: "96", label: "Motion Seats" },
            { value: "4DX", label: "Technology" },
            { value: "21 Effects", label: "Sensory Features" },
            { value: "270°", label: "Viewing Angle" }
        ],
        features: [
            "Motion-enabled seats synchronized with on-screen action.",
            "Multi-sensory effects: wind, water, light, scents, and vibrations.",
            "ScreenX panoramic visuals extend to side walls for 270° view.",
            "Perfect for action-packed, immersive cinematic experiences.",
        ],
        hasSeating: true,
        seatingCapacity: 150,
        experienceText: "Experience ULTRA 4DX at CGV:",
        cinemaLocations: [
            "CGV Sư Vạn Hạnh",
        ]
    },
    vip: {
        title: "L'amour VIP",
        description: "For bringing the most state-of-the-art experience to customers, CGV introduces L'amour bed cinema. With modern theater design, L'amour offers once in a lifetime experience to movie lovers with premium comfort and privacy.",
        type: "slideshow",
        slideshowId: "vip-slideshow",
        specs: [
            { value: "24", label: "Luxury Seats" },
            { value: "In-seat", label: "Dining Service" },
            { value: "Butler", label: "Service" },
            { value: "Private", label: "Lounge Access" }
        ],
        features: [
            "Premium electric recliner seats with massage functionality.",
            "Ideal for couples or private viewing with intimate atmosphere.",
            "4K projection with enhanced Dolby Atmos surround sound.",
            "Personalized in-seat service with gourmet food & beverages.",
        ],
        hasSeating: true,
        seatingCapacity: 20,
        experienceText: "Experience L'amour VIP at CGV:",
        cinemaLocations: [
            "CGV Hoàng Văn Thụ",
            "CGV Parkson Đồng Khởi",
            "CGV Vincom Royal City",
            "CGV Crescent Mall",
            "CGV Tràng Tiền Plaza",
            "CGV Vincom Metropolis Liễu Giai"
        ]
    }
};

// Biến toàn cục
let youtubePlayer;
let currentSlideIndex = { "lobby-slideshow": 0, "vip-slideshow": 0 };
let slideIntervals = {};

// Hàm khởi tạo YouTube Player
function onYouTubeIframeAPIReady() {
    youtubePlayer = new YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        playerVars: {
            'autoplay': 1,
            'controls': 1,
            'rel': 0,
            'modestbranding': 1,
            'fs': 1,
            'iv_load_policy': 3,
            'enablejsapi': 1,
            'playsinline': 1,
            'origin': window.location.origin
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

// Hàm khi YouTube Player sẵn sàng
function onPlayerReady(event) {
    console.log('YouTube Player ready');
    document.getElementById('video-loading').style.display = 'none';
}

// Hàm theo dõi trạng thái YouTube Player
function onPlayerStateChange(event) {
    const loadingElement = document.getElementById('video-loading');

    switch (event.data) {
        case YT.PlayerState.BUFFERING:
            loadingElement.style.display = 'block';
            break;
        case YT.PlayerState.PLAYING:
            loadingElement.style.display = 'none';
            break;
        case YT.PlayerState.PAUSED:
            loadingElement.style.display = 'none';
            break;
        case YT.PlayerState.ENDED:
            loadingElement.style.display = 'none';
            break;
    }
}

// Hàm xử lý lỗi
function onPlayerError(event) {
    console.error('YouTube Player error:', event.data);
    const loadingElement = document.getElementById('video-loading');
    loadingElement.innerHTML = `
        <div style="color: #ff6b6b;">
            <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 10px;"></i>
            <p>Cannot load video</p>
            <p style="font-size: 0.9rem; margin-top: 5px;">Please check your connection</p>
        </div>
    `;
}

// Hàm chuyển đổi video YouTube
function changeYouTubeVideo(videoId) {
    if (youtubePlayer && youtubePlayer.loadVideoById) {
        document.getElementById('video-loading').style.display = 'block';
        youtubePlayer.loadVideoById(videoId);

        setTimeout(() => {
            if (document.getElementById('video-loading').style.display !== 'none') {
                document.getElementById('video-loading').style.display = 'none';
            }
        }, 5000);
    }
}

// Slideshow functions
function initSlideshow(slideshowId) {
    const slides = document.querySelectorAll(`#${slideshowId} .slide`);
    const dots = document.querySelectorAll(`#${slideshowId} .dot`);

    // Reset all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Set active slide and dot
    slides[currentSlideIndex[slideshowId]].classList.add('active');
    dots[currentSlideIndex[slideshowId]].classList.add('active');
}

function nextSlide(slideshowId) {
    const slides = document.querySelectorAll(`#${slideshowId} .slide`);
    const dots = document.querySelectorAll(`#${slideshowId} .dot`);

    slides[currentSlideIndex[slideshowId]].classList.remove('active');
    dots[currentSlideIndex[slideshowId]].classList.remove('active');

    currentSlideIndex[slideshowId] = (currentSlideIndex[slideshowId] + 1) % slides.length;

    slides[currentSlideIndex[slideshowId]].classList.add('active');
    dots[currentSlideIndex[slideshowId]].classList.add('active');
}

function prevSlide(slideshowId) {
    const slides = document.querySelectorAll(`#${slideshowId} .slide`);
    const dots = document.querySelectorAll(`#${slideshowId} .dot`);

    slides[currentSlideIndex[slideshowId]].classList.remove('active');
    dots[currentSlideIndex[slideshowId]].classList.remove('active');

    currentSlideIndex[slideshowId] = (currentSlideIndex[slideshowId] - 1 + slides.length) % slides.length;

    slides[currentSlideIndex[slideshowId]].classList.add('active');
    dots[currentSlideIndex[slideshowId]].classList.add('active');
}

function goToSlide(slideshowId, slideIndex) {
    const slides = document.querySelectorAll(`#${slideshowId} .slide`);
    const dots = document.querySelectorAll(`#${slideshowId} .dot`);

    slides[currentSlideIndex[slideshowId]].classList.remove('active');
    dots[currentSlideIndex[slideshowId]].classList.remove('active');

    currentSlideIndex[slideshowId] = slideIndex;

    slides[currentSlideIndex[slideshowId]].classList.add('active');
    dots[currentSlideIndex[slideshowId]].classList.add('active');
}

function startSlideshow(slideshowId) {
    stopSlideshow(slideshowId);
    slideIntervals[slideshowId] = setInterval(() => nextSlide(slideshowId), 4000);
}

function stopSlideshow(slideshowId) {
    if (slideIntervals[slideshowId]) {
        clearInterval(slideIntervals[slideshowId]);
    }
}

// Hàm tạo sơ đồ ghế ngồi
function createSeatingPlan(capacity) {
    const seatingGrid = document.getElementById('seating-grid');
    if (!seatingGrid) return;

    seatingGrid.innerHTML = '';

    let rows, cols;
    if (capacity === 20) { // VIP room
        rows = 4;
        cols = 5;
    } else if (capacity === 120) { // Cinema 1
        rows = 10;
        cols = 12;
    } else { // Cinema 2
        rows = 10;
        cols = 15;
    }

    const rowLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    const seatTypes = ['available', 'vip', 'couple', 'wheelchair', 'occupied'];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const seat = document.createElement('div');
            const seatNumber = `${rowLabels[row]}${col + 1}`;

            // Random seat type for demo
            const randomType = seatTypes[Math.floor(Math.random() * seatTypes.length)];

            seat.className = `seat ${randomType}`;
            seat.textContent = seatNumber;
            seat.dataset.seat = seatNumber;

            // Add seat label for first row
            if (row === 0) {
                const label = document.createElement('div');
                label.className = 'seat-label';
                label.textContent = `${col + 1}`;
                seat.appendChild(label);
            }

            // Add row label for first column
            if (col === 0) {
                const rowLabel = document.createElement('div');
                rowLabel.className = 'seat-label';
                rowLabel.textContent = rowLabels[row];
                rowLabel.style.left = '-20px';
                seat.appendChild(rowLabel);
            }

            // Add click event for available seats
            if (randomType === 'available' || randomType === 'vip') {
                seat.addEventListener('click', function () {
                    this.classList.toggle('selected');
                });
            }

            seatingGrid.appendChild(seat);
        }
    }
}

// Hàm tạo danh sách rạp chiếu
function createCinemaLocations(locations) {
    const cinemaLocationsContainer = document.getElementById('cinema-locations');
    if (!cinemaLocationsContainer) return;

    cinemaLocationsContainer.innerHTML = '';

    const locationsGrid = document.createElement('div');
    locationsGrid.className = 'locations-grid';

    locations.forEach(location => {
        const locationItem = document.createElement('div');
        locationItem.className = 'location-item';
        locationItem.innerHTML = `
            <i class="fas fa-map-marker-alt"></i>
            <div>${location}</div>
        `;
        locationItem.addEventListener('click', function () {
            alert(`Selected: ${location}\nThis would navigate to booking page for this location.`);
        });
        locationsGrid.appendChild(locationItem);
    });

    cinemaLocationsContainer.appendChild(locationsGrid);
}

// Hàm tạo sơ đồ ghế ngồi container
function createSeatingPlanContainer() {
    const seatingPlan = document.getElementById('seating-plan');
    if (!seatingPlan) return;

    seatingPlan.innerHTML = `
        <h3 class="seating-title">SEAT MAP</h3>
        
        <div class="seating-grid" id="seating-grid"></div>
        <div class="seat-legend">
            <div class="legend-item">
                <div class="legend-color" style="background-color: #0e9725ff;"></div>
                <span>Standard</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background-color: #b81111ff;"></div>
                <span>VIP</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background-color: #9b59b6;"></div>
                <span>SWEETBOX</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background-color: #dab40aff;"></div>
                <span>Selected</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background-color: #7f8c8d;"></div>
                <span>Reserved</span>
            </div>
        </div>
    `;
}

// Hàm hiển thị/ẩn các phần media
function showMedia(type, slideshowId) {
    const lobbySlideshow = document.getElementById('lobby-slideshow');
    const vipSlideshow = document.getElementById('vip-slideshow');
    const videoSection = document.getElementById('cinema-video');

    // Ẩn tất cả
    lobbySlideshow.style.display = 'none';
    vipSlideshow.style.display = 'none';
    videoSection.style.display = 'none';

    // Hiển thị phần được chọn
    if (type === 'slideshow') {
        const activeSlideshow = document.getElementById(slideshowId);
        if (activeSlideshow) {
            activeSlideshow.style.display = 'block';
            initSlideshow(slideshowId);
            startSlideshow(slideshowId);
        }
    } else if (type === 'video') {
        videoSection.style.display = 'block';
        // Dừng tất cả slideshow
        stopAllSlideshows();
    }
}

// Hàm dừng tất cả slideshow
function stopAllSlideshows() {
    Object.keys(slideIntervals).forEach(slideshowId => {
        stopSlideshow(slideshowId);
    });
}

// Hàm cập nhật thông tin phòng
function updateRoomInfo(sceneId) {
    const scene = scenes[sceneId];

    document.getElementById('current-location').innerHTML = `<i class="fas fa-door-open"></i> ${scene.title}`;
    document.getElementById('location-desc').textContent = scene.description;
    document.getElementById('experience-text').textContent = scene.experienceText;

    // Cập nhật specs grid
    const specsGrid = document.getElementById('specs-grid');
    specsGrid.innerHTML = scene.specs.map(spec => `
        <div class="spec-item">
            <div class="spec-value">${spec.value}</div>
            <div class="spec-label">${spec.label}</div>
        </div>
    `).join('');

    // Cập nhật features list
    const featuresList = document.getElementById('features-list');
    featuresList.innerHTML = scene.features.map(feature => `
        <li>${feature}</li>
    `).join('');

    // Cập nhật danh sách rạp chiếu
    createCinemaLocations(scene.cinemaLocations);

    // Hiển thị/ẩn sơ đồ ghế ngồi
    const seatingPlan = document.getElementById('seating-plan');
    if (scene.hasSeating) {
        if (!document.getElementById('seating-grid')) {
            createSeatingPlanContainer();
        }
        seatingPlan.style.display = 'block';
        createSeatingPlan(scene.seatingCapacity);
    } else {
        seatingPlan.style.display = 'none';
    }

    // Hiển thị media phù hợp
    if (scene.type === 'slideshow') {
        showMedia('slideshow', scene.slideshowId);
    } else if (scene.type === 'video') {
        showMedia('video');
        changeYouTubeVideo(scene.videoId);
    }
}

// Thêm biến toàn cục cho menu slideshow
let menuCurrentSlide = 0;
let menuSlideInterval;

// Hàm cho menu slideshow
function initMenuSlideshow() {
    const slides = document.querySelectorAll('.menu-slide');
    const dots = document.querySelectorAll('.menu-dot');

    // Reset all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Set active slide and dot
    slides[menuCurrentSlide].classList.add('active');
    dots[menuCurrentSlide].classList.add('active');
}

function nextMenuSlide() {
    const slides = document.querySelectorAll('.menu-slide');
    const dots = document.querySelectorAll('.menu-dot');

    slides[menuCurrentSlide].classList.remove('active');
    dots[menuCurrentSlide].classList.remove('active');

    menuCurrentSlide = (menuCurrentSlide + 1) % slides.length;

    slides[menuCurrentSlide].classList.add('active');
    dots[menuCurrentSlide].classList.add('active');
}

function prevMenuSlide() {
    const slides = document.querySelectorAll('.menu-slide');
    const dots = document.querySelectorAll('.menu-dot');

    slides[menuCurrentSlide].classList.remove('active');
    dots[menuCurrentSlide].classList.remove('active');

    menuCurrentSlide = (menuCurrentSlide - 1 + slides.length) % slides.length;

    slides[menuCurrentSlide].classList.add('active');
    dots[menuCurrentSlide].classList.add('active');
}

function goToMenuSlide(slideIndex) {
    const slides = document.querySelectorAll('.menu-slide');
    const dots = document.querySelectorAll('.menu-dot');

    slides[menuCurrentSlide].classList.remove('active');
    dots[menuCurrentSlide].classList.remove('active');

    menuCurrentSlide = slideIndex;

    slides[menuCurrentSlide].classList.add('active');
    dots[menuCurrentSlide].classList.add('active');
}

function startMenuSlideshow() {
    stopMenuSlideshow();
    menuSlideInterval = setInterval(nextMenuSlide, 4000);
}

function stopMenuSlideshow() {
    if (menuSlideInterval) {
        clearInterval(menuSlideInterval);
    }
}


// Khởi tạo khi DOM ready
document.addEventListener('DOMContentLoaded', function () {
    // Setup menu slideshow
    const menuPrevBtn = document.querySelector('.menu-slideshow-btn.prev-btn');
    const menuNextBtn = document.querySelector('.menu-slideshow-btn.next-btn');
    const menuDots = document.querySelectorAll('.menu-dot');

    // Khởi tạo menu slideshow
    if (document.querySelector('.menu-slide')) {
        initMenuSlideshow();
        startMenuSlideshow();
    }

    // Menu slideshow controls
    if (menuPrevBtn) {
        menuPrevBtn.addEventListener('click', prevMenuSlide);
    }
    if (menuNextBtn) {
        menuNextBtn.addEventListener('click', nextMenuSlide);
    }

    menuDots.forEach(dot => {
        dot.addEventListener('click', function () {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToMenuSlide(slideIndex);
        });
    });

    // Pause menu slideshow khi hover
    const menuSlideshowContainer = document.querySelector('.menu-slideshow-container');
    if (menuSlideshowContainer) {
        menuSlideshowContainer.addEventListener('mouseenter', stopMenuSlideshow);
        menuSlideshowContainer.addEventListener('mouseleave', startMenuSlideshow);
    }
    const videoLoading = document.getElementById('video-loading');
    const menuLoading = document.getElementById('menu-loading');
    const sceneBtns = document.querySelectorAll('#tour .scene-btn');

    // Setup slideshow controls
    function setupSlideshowControls(slideshowId) {
        const prevBtn = document.querySelector(`#${slideshowId} .prev-btn`);
        const nextBtn = document.querySelector(`#${slideshowId} .next-btn`);
        const dots = document.querySelectorAll(`#${slideshowId} .dot`);

        if (prevBtn) {
            prevBtn.onclick = () => prevSlide(slideshowId);
        }
        if (nextBtn) {
            nextBtn.onclick = () => nextSlide(slideshowId);
        }

        dots.forEach(dot => {
            dot.addEventListener('click', function () {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                goToSlide(slideshowId, slideIndex);
            });
        });

        // Pause slideshow khi hover
        const slideshowContainer = document.querySelector(`#${slideshowId} .slideshow-container`);
        if (slideshowContainer) {
            slideshowContainer.addEventListener('mouseenter', () => stopSlideshow(slideshowId));
            slideshowContainer.addEventListener('mouseleave', () => startSlideshow(slideshowId));
        }
    }

    // Setup cho cả hai slideshow
    setupSlideshowControls('lobby-slideshow');
    setupSlideshowControls('vip-slideshow');

    // Scene navigation cho Virtual Tour
    sceneBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const sceneId = this.getAttribute('data-scene');
            const scene = scenes[sceneId];

            // Update active button
            sceneBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Update room info
            updateRoomInfo(sceneId);
        });
    });

    // Navigation giữa các pages
    document.querySelectorAll('[data-page]').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');

            // Ẩn tất cả pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });

            // Hiện page được chọn
            document.getElementById(pageId).classList.add('active');

            // Cập nhật active nav
            document.querySelectorAll('.nav-btn').forEach(nav => {
                nav.classList.remove('active');
            });
            this.classList.add('active');

            // Scroll to top khi chuyển page
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Khởi động slideshow nếu vào trang tour
            if (pageId === 'tour') {
                const activeScene = document.querySelector('#tour .scene-btn.active').getAttribute('data-scene');
                if (scenes[activeScene].type === 'slideshow') {
                    startSlideshow(scenes[activeScene].slideshowId);
                }
            }
        });
    });

    // Thêm event listeners cho các button booking
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function () {
            alert('Booking system would open here! This is a demo.');
        });
    });

    document.querySelectorAll('.btn-secondary').forEach(btn => {
        btn.addEventListener('click', function () {
            alert('Additional information would open here! This is a demo.');
        });
    });

    // Khởi tạo thông tin phòng đầu tiên
    updateRoomInfo('lobby');

    // Ẩn loading khi hình ảnh menu đã load
    const menuImage = document.getElementById('menu-image');
    if (menuImage) {
        menuImage.onload = function () {
            if (menuLoading) menuLoading.style.display = 'none';
        };
        menuImage.onerror = function () {
            if (menuLoading) {
                menuLoading.innerHTML = `
                    <div style="color: #ff6b6b;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 10px;"></i>
                        <p>Cannot load menu image</p>
                    </div>
                `;
            }
        };
    }

    // Thêm hiệu ứng loading
    window.addEventListener('load', function () {
        if (videoLoading) videoLoading.style.display = 'none';
        if (menuLoading) menuLoading.style.display = 'none';
    });
});