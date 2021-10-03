/**
 * 1. Render songs
 * 2. Scroll top
 * 3. Play/pause/ seek
 * 4. CD rotate
 * 5. next/ prev
 * 6. Random
 * 7. next/ repeat when end of song
 * 8. acitve song
 * 9. scroll sctive song into view
 * 10. play song when click
 */
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const nameSong = document.querySelector('.dashboard-decrip')
const cdthumb = document.querySelector('.cd-thumb')
const audio = document.querySelector('#audio')
const playBtn = document.querySelector('.btn-toggle-play')
const player = document.querySelector('.player')
const progress = document.querySelector('.progress')
const nextBtn = document.querySelector('.btn-next')
const prevBtn = document.querySelector('.btn-prev')
const randomBtn = document.querySelector('.btn-random')
const repeatBtn = document.querySelector('.btn-repeat')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: 'Đường Tôi Chở Em Về',
            singer: 'buitruonglinh',
            path: './assets/music/Đường Tôi Chở Em Về _ buitruonglinh.mp3',
            image: './assets/img/duong_toi_cho_em_ve.jpg'
        },
        {
            name: 'CƯỚI ĐI',
            singer: '2T',
            path: './assets/music/2T - CƯỚI ĐI x Changg ( Prod. So Hi x Flowz ). (128 kbps).mp3',
            image: './assets/img/cuoi_di.jpg'
        },
        {
            name: 'Dù Cho Mai Về Sau',
            singer: 'buitruonglinh x Freak D',
            path: './assets/music/Dù Cho Mai Về Sau.mp3',
            image: './assets/img/du_cho_mai_ve_sau.jpg'
        },
        {
            name: 'Yêu Như Ngày Cuối',
            singer: 'Mai Tiến Dũng',
            path: './assets/music/YÊU NHƯ NGÀY YÊU CUỐI.mp3',
            image: './assets/img/yeu_nhu_ngay_cuoi.jpg'
        },
        {
            name: 'Họ Yêu Ai Mất Rồi',
            singer: 'Doãn Hiếu',
            path: './assets/music/Họ Yêu Ai Mất Rồi Doãn Hiếu .mp3',
            image: './assets/img/ho_yeu_ai_mat_roi.jpg'
        },
        {
            name: 'Yêu Từ Đâu Mà Ra',
            singer: 'Lil ZPOET',
            path: './assets/music/Yêu Từ Đâu Mà Ra.mp3',
            image: './assets/img/yeu_tu_dau_ma_ra.jpg'
        },
        {
            name: '3107 3',
            singer: 'W/n ft. ( Nâu,Duongg,Titie )',
            path: './assets/music/3107 3 - W_n  ft. ( Nâu,Duongg,Titie )- OFFICIAL MV (128 kbps).mp3',
            image: './assets/img/3107 3.jpg'
        },
        {
            name: 'Bỏ Em Vào Balo',
            singer: 'Tân Trần x Freak D',
            path: './assets/music/Bỏ Em Vào Balo.mp3',
            image: './assets/img/bo_em_vao_balo.jpg'
        },
        {
            name: 'Sài Gòn Đau Lòng Quá',
            singer: 'Hứa Kim Tuyền x Hoàng Duyên',
            path: './assets/music/SÀI GÒN ĐAU LÒNG QUÁ - HỨA KIM TUYỀN x HOÀNG DUYÊN (OFFICIAL MV) (128 kbps).mp3',
            image: './assets/img/sai_gon_dau_long_qua.jpg'
        },
        {
            name: 'Yêu Nhiều Ghen Nhiều',
            singer: 'Hương Ly',
            path: './assets/music/YÊU NHIỀU GHEN NHIỀU - THANH HƯNG - HƯƠNG LY COVER (128 kbps).mp3',
            image: './assets/img/yeu_nhieu_ghen_nhieu.jpg'
        },
        {
            name: 'Tình Yêu Màu Hồng',
            singer: 'Hồ Văn Quý x Xám x Freak D',
            path: './assets/music/Tình Yêu Màu Hồng (Lofi Ver.) - Hồ Văn Quý x Xám x Freak D (128 kbps).mp3',
            image: './assets/img/tinh_yeu_mau_hong.jpg'
        },

    ],
    render: function() {
        const htmls = this.songs.map(function(song,index) {
            return `
                <div class="song ${index === app.currentIndex ? 'active':''}" dataIndex="${index}">
                    <div class="thumb" style="background-image: url('${song.image}')"></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        document.querySelector('.playlist').innerHTML = htmls.join('')
    },
    handleEvent: function() {
        // Xử lí phóng to thu nhỏ cd khi scroll
        const cdWdith = document.querySelector('.cd').offsetWidth

        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWdith - scrollTop

            document.querySelector('.cd').style.width = newCdWidth >0 ? newCdWidth + 'px' : 0
            document.querySelector('.cd').style.opacity = newCdWidth / cdWdith
        }

        // Xử lí quay cd
        const cdThumbAnimate = cdthumb.animate([
            {transform: 'rotate(360deg)'}
        ], { 
            duration: 100000,
            interations: 'Infinity'
        })
        cdThumbAnimate.pause()

        // Xử lí khi play
        playBtn.onclick = function() {
            if(app.isPlaying){
                app.isPlaying = false
                audio.pause()
                player.classList.remove('playing')
                cdThumbAnimate.pause()
            } else{
                app.isPlaying = true
                audio.play()
                player.classList.add('playing')
                cdThumbAnimate.play()
            }
        }

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration *100)
                progress.value = progressPercent 
            }
        }

        // Xử lí khi tua
        progress.onchange = function() {
            const seekTime = progress.value/100 * audio.duration
            audio.currentTime= seekTime
        }

        // khi next song
        nextBtn.onclick = function() {
            if(app.isRandom){
                app.playRandomSong()
            } else {
                app.nextSong()
            }
            audio.play()
            app.render()
            app.scrollToActiveSong()
        }

        // khi prev song
        prevBtn.onclick = function() {
            if(app.isRandom){
                app.playRandomSong()
            } else {
                app.prevSong()
            }
            audio.play()
            app.render()
            app.scrollToActiveSong()
        }

        //khi random song
        randomBtn.onclick = function() {
            app.isRandom = ! app.isRandom
            randomBtn.classList.toggle('active',app.isRandom)
        }

        //xử lí next song khi end song
        audio.onended = function() {
            nextBtn.click()
            audio.play()
        }

        //khi repeat song
        repeatBtn.onclick = function() {
            app.isRepeat = !app.isRepeat
            repeatBtn.classList.toggle('active',app.isRepeat)
        }

        //xử lí repeat lại song khi end
        audio.onended = function() {
            if(app.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        //khi click vào playlist
        //e.target trả về trúng cái mà click vào
        document.querySelector('.playlist').onclick = function(e) {
            if(e.target.closest('.song:not(.active)')){
                //closest trả về nó hoặc cha của nó
                app.currentIndex = Number(e.target.closest('.song:not(.active)').getAttribute('dataIndex'))
                app.loadCurrentSong()
                app.render()
                audio.play()
            }
        }
    },
    scrollToActiveSong: function() {
        setTimeout(function() {
            document.querySelector('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        },200)
    },
    getCurrentSong: function() {
        return this.songs[this.currentIndex]
    },
    loadCurrentSong: function() {
        nameSong.innerText = this.getCurrentSong().name
        cdthumb.style.backgroundImage = `url('${this.getCurrentSong().image}')`
        audio.src = this.getCurrentSong().path
    },
    nextSong: function() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex=0
        }
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--
        if(this.currentIndex <0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function() {
        var newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while(newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function(){
        //lắng nghe sự kiện (DOM event)
        this.handleEvent()

        //Load bài hát đầu khi mới vào
        this.loadCurrentSong()

        this.render()
    }
}

app.start()