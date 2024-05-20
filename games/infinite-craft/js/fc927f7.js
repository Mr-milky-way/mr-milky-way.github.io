(window.webpackJsonp = window.webpackJsonp || []).push([[28, 10], {
    1319: function(e, t, n) {
        "use strict";
        n.r(t);
        n(50),
        n(43),
        n(87),
        n(88);
        var canvas, r, o, c, d, l = n(10), f = n(33), h = n(284), v = (n(60),
        n(314),
        n(45),
        n(15),
        n(32),
        n(163),
        n(62),
        n(65),
        n(34),
        n(110),
        n(338),
        n(208),
        n(46),
        n(383),
        n(204),
        n(303),
        []), m = 0, x = 0, w = [255, 255, 255], y = [175, 175, 175], I = [[204, 200, 241], [50, 213, 202], [242, 187, 128]];

        function k(e, t, n, r, o, c) {
            this.x = e,
            this.y = t,
            this.xSpeed = n,
            this.ySpeed = r,
            this.radius = o,
            this.opacity = c,
            this.color = I[Math.floor(Math.random() * I.length)]
        }

        function S() {
            o = window.innerWidth * d,
            c = window.innerHeight * d,
            canvas.width = o,
            canvas.height = c
        }

        var C = {
            drawParticles: function(e, t) {
                if (!(e - m < 15)) {
                    var n = Math.min(e - m, 30);
                    m = e,
                    v.forEach((function(e) {
                        e.x += e.xSpeed * n,
                        e.y += e.ySpeed * n,
                        e.x < 0 && (e.x = o),
                        e.x > o && (e.x = 10),
                        e.y < 0 && (e.y = c),
                        e.y > c && (e.y = 10)
                    }
                    )),
                    r.clearRect(0, 0, o, c),
                    r.lineWidth = 1,
                    v.forEach((function(e, i) {
                        e.numLines = 0,
                        r.beginPath(),
                        r.arc(e.x, e.y, e.radius, 0, 2 * Math.PI, !1),
                        r.fillStyle = "rgba(".concat(w[0], ", ").concat(w[1], ", ").concat(w[2], ", ").concat(e.opacity, ")"),
                        r.fill()
                    }
                    )),
                    t.forEach((function(e) {
                        e.numLines = 0
                    }
                    )),
                    v.forEach((function(e, i) {
                        for (var t = x; t < Math.min(v.length, x + 4); t++)
                            if (i !== t) {
                                var n = v[t]
                                  , r = e.x - n.x
                                  , o = e.y - n.y;
                                Math.sqrt(r * r + o * o) < 100 && (e.xSpeed += r / 1e5,
                                e.ySpeed += o / 1e5,
                                e.xSpeed = Math.min(Math.max(e.xSpeed, -.01), .01),
                                e.ySpeed = Math.min(Math.max(e.ySpeed, -.01), .01))
                            }
                    }
                    )),
                    x = (x + 4) % v.length,
                    window.innerWidth < 800 || (t.forEach((function(e, i) {
                        for (var n = i + 1; n < t.length; n++) {
                            var o = t[n]
                              , c = (e.left + e.width / 2) * d
                              , l = (e.top + e.height / 2) * d
                              , f = (o.left + o.width / 2) * d
                              , h = (o.top + o.height / 2) * d
                              , v = c - f
                              , m = l - h
                              , x = Math.sqrt(v * v + m * m);
                            x < 500 && (e.numLines++,
                            o.numLines++,
                            r.beginPath(),
                            r.moveTo(c, l),
                            r.lineTo(f, h),
                            r.strokeStyle = "rgba(".concat(y[0], ", ").concat(y[1], ", ").concat(y[2], ", ").concat(Math.min(1, 1 - x / 500), ")"),
                            r.stroke())
                        }
                    }
                    )),
                    t.forEach((function(e) {
                        v.forEach((function(t) {
                            if (!(t.numLines > 2 || e.numLines > 6)) {
                                var n = (e.left + e.width / 2) * d
                                  , o = (e.top + e.height / 2) * d
                                  , c = t.x - n
                                  , l = t.y - o
                                  , f = Math.sqrt(c * c + l * l);
                                f < 250 && (t.numLines++,
                                e.numLines++,
                                r.beginPath(),
                                r.moveTo(t.x, t.y),
                                r.lineTo(n, o),
                                r.strokeStyle = "rgba(175, 175, 175, ".concat(Math.min(1, 1 - f / 250), ")"),
                                r.stroke())
                            }
                        }
                        ))
                    }
                    )))
                }
            },
            createParticles: function(e) {
                canvas = e,
                d = Math.min(window.devicePixelRatio, 2),
                o = window.innerWidth * d,
                c = window.innerHeight * d,
                canvas.width = o,
                canvas.height = c,
                r = canvas.getContext("2d"),
                window.addEventListener("resize", S);
                for (var t = Math.min(150, window.innerWidth * window.innerHeight / 12e3), i = 0; i < t; i++) {
                    var n = Math.random()
                      , l = n * (1.2 * d) + 1.1 * d
                      , f = .4 * (1 - n) + .1;
                    v.push(new k(Math.random() * o,Math.random() * c,.03 * Math.random() - .015,.03 * Math.random() - .015,l,f))
                }
            },
            setParticleColor: function(e) {
                e ? (w = [255, 255, 255],
                y = [240, 240, 240]) : (w = [0, 0, 0],
                y = [175, 175, 175])
            },
            beforeDestroy: function() {
                window.removeEventListener("resize", S),
                v = [],
                m = 0,
                x = 0
            }
        }
          , _ = n(336);

        function E(object, e) {
            var t = Object.keys(object);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(object);
                e && (n = n.filter((function(e) {
                    return Object.getOwnPropertyDescriptor(object, e).enumerable
                }
                ))),
                t.push.apply(t, n)
            }
            return t
        }

        function M(e) {
            for (var i = 1; i < arguments.length; i++) {
                var source = null != arguments[i] ? arguments[i] : {};
                i % 2 ? E(Object(source), !0).forEach((function(t) {
                    Object(f.a)(e, t, source[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(source)) : E(Object(source)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(source, t))
                }
                ))
            }
            return e
        }

        var z, j, D, O = null, P = {
            x: 0,
            y: 0
        }, N = {
            x: 0,
            y: 0
        }, R = 0, A = {
            data: function() {
                return {
                    elements: [{
                        text: "Water",
                        emoji: "💧",
                        discovered: !1
                    }, {
                        text: "Fire",
                        emoji: "🔥",
                        discovered: !1
                    }, {
                        text: "Wind",
                        emoji: "🌬️",
                        discovered: !1
                    }, {
                        text: "Earth",
                        emoji: "🌍",
                        discovered: !1
                    }],
                    instances: [{
                        id: 0,
                        text: "Water",
                        emoji: "💧",
                        disabled: !1,
                        zIndex: 0,
                        isNew: !1,
                        discovered: !1,
                        hide: !0
                    }],
                    selectedInstance: null,
                    instanceId: 10,
                    hoverId: -1,
                    firstSelected: "",
                    secondSelected: "",
                    mouseDown: !1,
                    moveListener: null,
                    sorts: ["time", "name", "emoji"],
                    sortBy: "time",
                    mobileCraftedElement: {},
                    hasCrafted: !1,
                    sidebarSize: 305,
                    discoveries: [],
                    mobileIsCrafting: !1,
                    instanceSound: null,
                    rewardSound: null,
                    deleteSound: null,
                    errorSound: null,
                    discoverySound: null,
                    instanceSoundRate: 1,
                    isMuted: !1,
                    isActive: !0,
                    isDeleting: !1,
                    searchQuery: "",
                    showDiscoveredOnly: !1,
                    showControlFade: !0,
                    isDarkMode: !1,
                    isMobile: !1
                }
            },
            watch: {
                searchQuery: function() {
                    var e = this;
                    this.$nextTick((function() {
                        "" === e.searchQuery ? e.$refs.sidebar.scrollTop = R : e.$refs.sidebar.scrollTop = 0
                    }
                    ))
                }
            },
            computed: {
                sortedElements: function() {
                    var e = this.elements;
                    return "name" === this.sortBy ? e = Object(h.a)(e).sort((function(a, b) {
                        return a.text.localeCompare(b.text)
                    }
                    )) : "emoji" === this.sortBy && (e = Object(h.a)(e).sort((function(a, b) {
                        var e = a.emoji || "⬜"
                          , t = b.emoji || "⬜";
                        return e.localeCompare(t)
                    }
                    ))),
                    e
                },
                filteredElements: function() {
                    var e = this.sortedElements;
                    return !this.showDiscoveredOnly && !this.searchQuery || this.isDeleting || (e = e.filter((function(element) {
                        return !element.hidden
                    }
                    ))),
                    this.showDiscoveredOnly && (e = e.filter((function(element) {
                        return element.discovered
                    }
                    ))),
                    e
                },
                searchResults: function() {
                    if (!this.searchQuery)
                        return [];
                    for (var e = this.filteredElements, t = [], n = 0, r = this.searchQuery.toLowerCase(); t.length < 200 && n < e.length; )
                        e[n].text.toLowerCase().indexOf(r) > -1 && t.push(e[n]),
                        n++;
                    return t
                },
                showPinwheel: function() {
                    return this.instances.some((function(e) {
                        return e.isNew
                    }
                    ))
                }
            },
            created: function() {
                this.checkIfMobile()
            },
            mounted: function() {
                var e = this
                  , t = JSON.parse(localStorage.getItem("infinite-craft-data"));
                t && t.elements && (this.elements = t.elements,
                this.hasCrafted = !0),
                t && (this.isDarkMode = t.darkMode || !1),
                this.checkIfMobile(),
                this.instanceSound = new _.Howl({
                    src: ["/infinite-craft/instance.mp3"],
                    volume: .5
                }),
                this.rewardSound = new _.Howl({
                    src: ["/infinite-craft/reward.mp3"],
                    volume: .4
                }),
                this.deleteSound = new _.Howl({
                    src: ["/infinite-craft/delete.mp3"],
                    volume: .45
                }),
                this.errorSound = new _.Howl({
                    src: ["/infinite-craft/error.mp3"],
                    volume: .4
                }),
                this.discoverySound = new _.Howl({
                    src: ["/infinite-craft/discovery.mp3"],
                    volume: .1,
                    rate: 1.1
                }),
                C.setParticleColor(this.isDarkMode),
                C.createParticles(this.$refs.particles);
                requestAnimationFrame((function t(time) {
                    e.isActive && (C.drawParticles(time, e.instances),
                    requestAnimationFrame(t))
                }
                )),
                this.$addEventListener("mousemove", this.moveInstance),
                this.$addEventListener("touchmove", this.moveInstance),
                this.$addEventListener("mouseup", this.dropElement),
                this.$addEventListener("touchend", this.dropElement),
                this.$addEventListener("resize", this.onResize),
                this.$addEventListener("keydown", (function(t) {
                    "Escape" === t.key ? (e.isDeleting = !1,
                    e.searchQuery = "") : e.$refs.search.focus()
                }
                )),
                new ResizeObserver(this.checkControlsBlur).observe(this.$refs.sidebarInner),
                this.$nextTick((function() {
                    e.$refs.sidebar.addEventListener("scroll", e.checkControlsBlur)
                }
                )),
                this.onResize()
            },
            beforeDestroy: function() {
                C.beforeDestroy(),
                _.Howler.mute(!1),
                _.Howler.unload(),
                this.isActive = !1
            },
            methods: {
                selectElement: function(e, t) {
                    var n = this;
                    if (!this.isDeleting) {
                        this.playInstanceSound();
                        var r, o, c, d, l = e.target.getBoundingClientRect();
                        e.touches ? (c = e.touches[0].clientX,
                        d = e.touches[0].clientY) : (c = e.clientX,
                        d = e.clientY),
                        r = (c - l.left) / (l.right - l.left),
                        o = (d - l.top) / (l.bottom - l.top);
                        var f = this.instanceId++
                          , h = this.discoveries.includes(t.text)
                          , data = M({
                            left: l.left - 4,
                            top: l.top - 4,
                            offsetX: r,
                            offsetY: o,
                            id: f,
                            disabled: !1,
                            hasMoved: !1,
                            fromPanel: !0,
                            discovered: h
                        }, t);
                        this.selectedInstance = data,
                        this.instances.push(this.selectedInstance),
                        this.$nextTick((function() {
                            n.setInstancePosition(n.selectedInstance, l.left - 6, l.top - 6),
                            n.setInstanceZIndex(n.selectedInstance, n.instanceId)
                        }
                        )),
                        this.mouseDown = !0,
                        e.preventDefault()
                    }
                },
                selectInstance: function(e, t) {
                    if (3 === e.which)
                        return e.preventDefault(),
                        this.instances = this.instances.filter((function(i) {
                            return i.id !== t.id
                        }
                        )),
                        this.deleteSound.play(),
                        !1;
                    this.playInstanceSound(.09);
                    var n = this.getEventCoords(e)
                      , r = n.x
                      , o = n.y;
                    P = {
                        x: r,
                        y: o
                    },
                    t.disabled || (this.mouseDown = !0,
                    this.selectedInstance = t,
                    this.setInstanceZIndex(this.selectedInstance, ++this.instanceId),
                    t.offsetX = (r - t.left) / t.width,
                    t.offsetY = (o - t.top) / t.height),
                    e.preventDefault()
                },
                checkIfMobile: function() {
                    this.isMobile = window.innerWidth < 800
                },
                changeSort: function() {
                    var e = this.sorts.indexOf(this.sortBy) + 1;
                    e >= this.sorts.length ? this.sortBy = this.sorts[0] : this.sortBy = this.sorts[e]
                },
                checkControlsBlur: function() {
                    if (this.$refs.sidebar) {
                        "" === this.searchQuery && (R = this.$refs.sidebar.scrollTop);
                        var e = this.$refs.sidebar;
                        this.showControlFade = e.scrollHeight - e.scrollTop - e.clientHeight >= 1
                    }
                },
                mobileSelect: function(e, t) {
                    if (this.mobileCraftedElement = {},
                    this.playInstanceSound(),
                    this.firstSelected) {
                        if (!this.secondSelected) {
                            this.secondSelected = t,
                            document.getElementById("item-" + this.secondSelected.text).style = "animation: itemMobileJiggle 0.35s linear infinite;",
                            this.craftMobile()
                        }
                    } else
                        this.firstSelected = t,
                        document.getElementById("item-" + this.firstSelected.text).style = "animation: itemMobileJiggle 0.35s linear infinite;"
                },
                reset: function() {
                    confirm("Are you sure? This will delete all your progress!") && (localStorage.removeItem("infinite-craft-data"),
                    location.reload())
                },
                getEventCoords: function(e) {
                    var t, n;
                    return e.touches ? (t = e.touches[0].clientX,
                    n = e.touches[0].clientY) : (t = e.clientX,
                    n = e.clientY),
                    {
                        x: t,
                        y: n
                    }
                },
                duplicateInstance: function(e) {
                    var t = this
                      , n = M({}, e);
                    n.id = this.instanceId++,
                    n.elem = null,
                    n.hasMoved = !1,
                    n.fromPanel = !1,
                    n.disabled = !1,
                    this.instances.push(n),
                    this.$nextTick((function() {
                        n.elem = document.getElementById("instance-" + n.id),
                        t.setInstancePosition(n, n.left + 10, n.top - 10),
                        t.setInstanceZIndex(n, t.instanceId)
                    }
                    ))
                },
                onResize: function() {
                    var e = this;
                    this.sidebarSize = window.innerWidth >= 1150 ? 360 : 310,
                    this.instances.forEach((function(t) {
                        t.width || e.calcInstanceSize(t),
                        t.left + t.width > window.innerWidth - e.sidebarSize && e.setInstancePosition(t, window.innerWidth - e.sidebarSize - t.width, t.top),
                        t.top + t.height > window.innerHeight && e.setInstancePosition(t, t.left, window.innerHeight - t.height)
                    }
                    )),
                    this.checkControlsBlur(),
                    this.checkIfMobile()
                },
                dropElement: function(e) {
                    var t = this;
                    if (this.mouseDown = !1,
                    this.selectedInstance && !(window.innerWidth < 800))
                        if (Math.sqrt(Math.pow(N.x - P.x, 2) + Math.pow(N.y - P.y, 2)) < 10 && !this.selectedInstance.fromPanel)
                            this.removeCurrentHover();
                        else {
                            if (!this.selectedInstance.hasMoved && this.selectedInstance.fromPanel) {
                                var n = Math.random() * Math.PI * 2
                                  , r = 50 * Math.cos(n)
                                  , o = 50 * Math.sin(n);
                                return this.setInstancePosition(this.selectedInstance, (window.innerWidth - this.sidebarSize) / 2 + r, window.innerHeight / 2 - 40 + o),
                                this.selectedInstance.hasMoved = !0,
                                void this.calcInstanceSize(this.selectedInstance)
                            }
                            this.selectedInstance.hasMoved && (this.selectedInstance.left + this.selectedInstance.width > window.innerWidth - this.sidebarSize || !this.selectedInstance.width || !this.selectedInstance.left ? (this.instances = this.instances.filter((function(e) {
                                return e.id !== t.selectedInstance.id
                            }
                            )),
                            this.selectedInstance = null,
                            this.deleteSound.play()) : this.checkIntersections(this.selectedInstance))
                        }
                },
                hideElement: function(element) {
                    !element.hidden ? this.$set(element, "hidden", !0) : this.$delete(element, "hidden"),
                    this.saveItems(),
                    this.deleteSound.play()
                },
                clearInstances: function() {
                    this.instances = [],
                    this.deleteSound.play()
                },
                toggleDarkMode: function() {
                    this.isDarkMode = !this.isDarkMode,
                    C.setParticleColor(this.isDarkMode),
                    this.saveItems()
                },
                setInstancePosition: function(e, t, n) {
                    e.left = t,
                    e.top = n,
                    e.elem || (e.elem = document.getElementById("instance-" + e.id)),
                    e.elem.style.translate = "".concat(t, "px ").concat(n, "px")
                },
                setInstanceZIndex: function(e, t) {
                    e.zIndex = t,
                    e.elem.style.zIndex = t
                },
                moveInstance: function(e) {
                    if (this.mouseDown) {
                        var t = this.getEventCoords(e)
                          , n = t.x
                          , r = t.y;
                        N = {
                            x: n,
                            y: r
                        },
                        this.selectedInstance.hasMoved = !0,
                        this.setInstancePosition(this.selectedInstance, n - this.selectedInstance.offsetX * this.selectedInstance.width, r - this.selectedInstance.offsetY * this.selectedInstance.height),
                        this.selectedInstance.isNew && this.setPinwheelCoords({
                            x: this.selectedInstance.left + this.selectedInstance.width / 2,
                            y: this.selectedInstance.top + this.selectedInstance.height / 2
                        });
                        var o = this.checkIntersections(this.selectedInstance, !0);
                        if (this.removeCurrentHover(),
                        o)
                            document.getElementById("instance-" + o.id).classList.add("instance-hover"),
                            this.hoverId = o.id
                    }
                },
                removeCurrentHover: function() {
                    -1 !== this.hoverId && (document.getElementById("instance-" + this.hoverId).classList.remove("instance-hover"),
                    this.hoverId = -1)
                },
                calcInstanceSize: function(e) {
                    var element = document.getElementById("instance-" + e.id);
                    element && (e.width = element.offsetWidth,
                    e.height = element.offsetHeight)
                },
                checkIntersections: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    e.width && e.height || this.calcInstanceSize(e);
                    for (var n = Object(h.a)(this.instances).sort((function(a, b) {
                        return b.zIndex - a.zIndex
                    }
                    )), i = 0; i < n.length; i++)
                        if (n[i].id !== e.id) {
                            var r = n[i];
                            if (r.width && r.height || this.calcInstanceSize(r),
                            e.left < r.left + r.width && e.left + e.width > r.left && e.top < r.top + r.height && e.top + e.height > r.top)
                                return t && !r.disabled ? r : void this.craft(e, r)
                        }
                    return !1
                },
                setPinwheelCoords: function(e) {
                    this.$refs.pinwheel && (this.$refs.pinwheel.style.translate = "calc(".concat(e.x, "px - 48%) calc(").concat(e.y, "px - 50%)"))
                },
                getCenterOfCraft: function(e, t) {
                    var n = e.left + e.width / 2
                      , r = e.top + e.height / 2;
                    return {
                        x: (n + (t.left + t.width / 2)) / 2,
                        y: (r + (t.top + t.height / 2)) / 2
                    }
                },
                getCraftResponse: (D = Object(l.a)(regeneratorRuntime.mark((function e(t, n) {
                    var r, o, c, d, l;
                    return regeneratorRuntime.wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.prev = 0,
                                r = new AbortController,
                                this.$setTimeout((function() {
                                    return r.abort()
                                }
                                ), 12e3),
                                o = [t, n].sort((function(a, b) {
                                    return a.text.localeCompare(b.text)
                                }
                                )),
                                c = "https://infiniteback.org/pair?first=".concat(encodeURIComponent(o[0].text), "&second=").concat(encodeURIComponent(o[1].text)),
                                e.next = 7,
                                fetch(c, {
                                    signal: r.signal
                                });
                            case 7:
                                return d = e.sent,
                                e.next = 10,
                                d.json();
                            case 10:
                                return (l = e.sent).result = l.result.trim(),
                                e.abrupt("return", l);
                            case 15:
                                return e.prev = 15,
                                e.t0 = e.catch(0),
                                e.abrupt("return", {
                                    result: "Nothing"
                                });
                            case 18:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e, this, [[0, 15]])
                }
                ))),
                function(e, t) {
                    return D.apply(this, arguments)
                }
                ),
                craftMobile: (j = Object(l.a)(regeneratorRuntime.mark((function e() {
                    var t, n, element, r, o, c, d = this;
                    return regeneratorRuntime.wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                if (!this.mobileIsCrafting) {
                                    e.next = 2;
                                    break
                                }
                                return e.abrupt("return");
                            case 2:
                                if (this.mobileIsCrafting = !0,
                                this.hasCrafted = !0,
                                !this.firstSelected || !this.secondSelected) {
                                    e.next = 17;
                                    break
                                }
                                return t = function e(t) {
                                    t.target.style = "animation: none",
                                    t.target.removeEventListener("animationiteration", e)
                                }
                                ,
                                e.next = 8,
                                this.getCraftResponse(this.firstSelected, this.secondSelected);
                            case 8:
                                "Nothing" !== (n = e.sent).result && ((element = this.elements.find((function(element) {
                                    return element.text === n.result
                                }
                                ))) ? this.playInstanceSound() : (element = {
                                    text: n.result,
                                    emoji: n.emoji
                                },
                                this.elements.push(element),
                                this.saveItems(),
                                r = [.9, 1],
                                this.rewardSound.rate(r[Math.floor(Math.random() * r.length)]),
                                this.rewardSound.play()),
                                this.mobileCraftedElement = element,
                                O && clearTimeout(O),
                                O = setTimeout((function() {
                                    d.mobileCraftedElement = null
                                }
                                ), 1700)),
                                o = document.getElementById("item-" + this.firstSelected.text),
                                c = document.getElementById("item-" + this.secondSelected.text),
                                o.addEventListener("animationiteration", t),
                                c.addEventListener("animationiteration", t),
                                this.firstSelected = null,
                                this.secondSelected = null,
                                this.mobileIsCrafting = !1;
                            case 17:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e, this)
                }
                ))),
                function() {
                    return j.apply(this, arguments)
                }
                ),
                playInstanceSound: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : .3;
                    this.instanceSoundRate += .1,
                    this.instanceSoundRate > 1.3 && (this.instanceSoundRate = .9),
                    this.instanceSound.rate(this.instanceSoundRate),
                    this.instanceSound.volume(e),
                    this.instanceSound.play()
                },
                toggleSound: function() {
                    this.isMuted = !this.isMuted,
                    this.isMuted ? _.Howler.mute(!0) : _.Howler.mute(!1)
                },
                saveItems: function() {
                    localStorage.setItem("infinite-craft-data", JSON.stringify({
                        elements: this.elements,
                        darkMode: this.isDarkMode
                    }))
                },
                craft: (z = Object(l.a)(regeneratorRuntime.mark((function e(t, n) {
                    var r, o, c, d, element, l, f, h, v = this;
                    return regeneratorRuntime.wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                if (this.hasCrafted = !0,
                                !t.disabled && !n.disabled) {
                                    e.next = 3;
                                    break
                                }
                                return e.abrupt("return");
                            case 3:
                                return this.removeCurrentHover(),
                                t.disabled = !0,
                                n.disabled = !0,
                                e.next = 8,
                                this.getCraftResponse(t, n);
                            case 8:
                                "Nothing" !== (r = e.sent).result ? (o = this.getCenterOfCraft(t, n),
                                c = this.instanceId++,
                                d = {
                                    id: c,
                                    text: r.result,
                                    emoji: r.emoji,
                                    disabled: !1,
                                    zIndex: c,
                                    discovered: r.isNew
                                },
                                r.isNew && this.discoveries.push(r.result),
                                (element = this.elements.find((function(element) {
                                    return element.text.toLowerCase() === d.text.toLowerCase()
                                }
                                ))) && (d.text = element.text,
                                d.emoji = element.emoji,
                                d.discovered = element.discovered),
                                element ? this.playInstanceSound() : (this.elements.push({
                                    text: d.text,
                                    emoji: d.emoji,
                                    discovered: r.isNew
                                }),
                                this.saveItems(),
                                this.$nextTick((function() {
                                    v.setPinwheelCoords(o)
                                }
                                )),
                                d.isNew = !0,
                                r.isNew && this.discoverySound.play(),
                                l = [.9, 1],
                                this.rewardSound.rate(l[Math.floor(Math.random() * l.length)]),
                                this.rewardSound.play(),
                                this.$setTimeout((function() {
                                    d.isNew = !1
                                }
                                ), 1200)),
                                f = this.instances.findIndex((function(e) {
                                    return e.id === t.id
                                }
                                )),
                                this.instances.splice(f, 1),
                                h = this.instances.findIndex((function(e) {
                                    return e.id === n.id
                                }
                                )),
                                this.instances.splice(h, 1),
                                this.instances.push(d),
                                this.$nextTick((function() {
                                    v.calcInstanceSize(d),
                                    v.setInstancePosition(d, o.x - d.width / 2, o.y - d.height / 2),
                                    v.setInstanceZIndex(d, c)
                                }
                                ))) : (this.errorSound.play(),
                                t.disabled = !1,
                                n.disabled = !1);
                            case 10:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e, this)
                }
                ))),
                function(e, t) {
                    return z.apply(this, arguments)
                }
                )
            }
        }, $ = A, L = (n(985),
        n(987),
        n(28)), component = Object(L.a)($, (function() {
            var e = this
              , t = e._self._c;
            return t("div", {
                staticClass: "container",
                class: {
                    "dark-mode": e.isDarkMode
                }
            }, [t("nuxt-link", {
                attrs: {
                    to: ""
                }
            }, [t("div", {
                staticClass: "site-title",
                attrs: {
                    src: ""
                }
            })]), e._v(" "), t("div", {
                staticClass: "side-controls"
            }, [t("img", {
                staticClass: "trash",
                class: {
                    "trash-active": e.isDeleting
                },
                attrs: {
                    src: "/infinite-craft/trash.svg"
                },
                on: {
                    click: function(t) {
                        e.isDeleting = !e.isDeleting
                    }
                }
            }), e._v(" "), t("img", {
                staticClass: "dark-mode-icon",
                attrs: {
                    src: "/infinite-craft/dark-mode".concat(e.isDarkMode ? "-on" : "", ".svg")
                },
                on: {
                    click: e.toggleDarkMode
                }
            }), e._v(" "), t("img", {
                staticClass: "clear",
                attrs: {
                    src: "/infinite-craft/clear.svg"
                },
                on: {
                    click: e.clearInstances
                }
            }), e._v(" "), t("img", {
                staticClass: "sound",
                attrs: {
                    src: e.isMuted ? "/infinite-craft/mute.svg" : "/infinite-craft/sound.svg"
                },
                on: {
                    click: e.toggleSound
                }
            })]), e._v(" "), t("client-only", [t("Ad", {
                attrs: {
                    slotId: "7029931218",
                    adStyle: "display:inline-block; width:320px; height:100px; position: fixed; bottom: 0px; left: 50%; transform: translateX(calc(-50% - 196px));",
                    adFormat: "none",
                    isResponsive: !1,
                    minWidth: 1e3,
                    maxWidth: 800
                }
            }), e._v(" "), t("Ad", {
                attrs: {
                    slotId: "7029931218",
                    adStyle: "display:inline-block; width:320px; height:100px; position: fixed; bottom: 0px; left: 50%; transform: translateX(calc(-50% - 196px));",
                    adFormat: "none",
                    isResponsive: !1,
                    minWidth: 801
                }
            })], 1), e._v(" "), t("canvas", {
                ref: "particles",
                staticClass: "particles"
            }), e._v(" "), t("div", {
                ref: "sidebar",
                staticClass: "sidebar"
            }, [t("div", {
                ref: "sidebarInner",
                staticClass: "sidebar-inner"
            }, [(0 === e.filteredElements.length || e.searchQuery && 0 === e.searchResults.length) && e.hasCrafted ? t("div", {
                staticClass: "empty-sidebar"
            }, [t("img", {
                staticClass: "empty-sidebar-icon",
                attrs: {
                    src: "/infinite-craft/empty.svg"
                }
            }), e._v("\n        No items\n      ")]) : e._e(), e._v(" "), e.isMobile ? e._e() : t("div", {
                staticClass: "items",
                class: {
                    "is-delete-mode": e.isDeleting
                }
            }, [t("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: 0 === e.searchQuery.length,
                    expression: "searchQuery.length === 0"
                }]
            }, e._l(e.filteredElements, (function(element, i) {
                return t("div", {
                    key: element.text,
                    staticClass: "item",
                    class: {
                        "item-selected": e.firstSelected === element.text || e.secondSelected === element.text,
                        "item-discovered": element.discovered,
                        "item-hidden": element.hidden
                    },
                    on: {
                        mousedown: function(t) {
                            return e.selectElement(t, element)
                        },
                        touchstart: function(t) {
                            return e.selectElement(t, element)
                        }
                    }
                }, [t("span", {
                    staticClass: "item-emoji"
                }, [e._v(e._s(element.emoji || "⬜"))]), e._v("\n            " + e._s(element.text) + "\n            "), e.isDeleting ? t("div", {
                    staticClass: "item-remove",
                    on: {
                        click: function() {
                            return e.hideElement(element)
                        }
                    }
                }) : e._e()])
            }
            )), 0), e._v(" "), t("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.searchQuery.length > 0,
                    expression: "searchQuery.length > 0"
                }]
            }, e._l(e.searchResults, (function(element, i) {
                return t("div", {
                    key: element.text,
                    staticClass: "item",
                    class: {
                        "item-selected": e.firstSelected === element.text || e.secondSelected === element.text,
                        "item-discovered": element.discovered,
                        "item-hidden": element.hidden
                    },
                    on: {
                        mousedown: function(t) {
                            return e.selectElement(t, element)
                        },
                        touchstart: function(t) {
                            return e.selectElement(t, element)
                        }
                    }
                }, [t("span", {
                    staticClass: "item-emoji"
                }, [e._v(e._s(element.emoji || "⬜"))]), e._v("\n            " + e._s(element.text) + "\n            "), e.isDeleting ? t("div", {
                    staticClass: "item-remove",
                    on: {
                        click: function() {
                            return e.hideElement(element)
                        }
                    }
                }, [t("img", {
                    staticClass: "item-remove-icon",
                    attrs: {
                        src: "/infinite-craft/close.svg"
                    }
                })]) : e._e()])
            }
            )), 0), e._v(" "), e.hasCrafted || 0 === e.sortedElements.length ? e._e() : t("div", {
                staticClass: "instruction"
            }, [t("img", {
                staticClass: "instruction-icon",
                attrs: {
                    src: "/infinite-craft/left-arrow.svg"
                }
            }), e._v("\n          Drag elements to craft\n        ")])])]), e._v(" "), t("div", {
                staticClass: "sidebar-controls",
                class: {
                    "sidebar-controls-fade-show": e.showControlFade
                }
            }, [t("div", {
                staticClass: "sidebar-sorting"
            }, [t("div", {
                staticClass: "sidebar-discoveries sidebar-sorting-item",
                class: {
                    "sidebar-discoveries-active": e.showDiscoveredOnly
                },
                on: {
                    click: function(t) {
                        e.showDiscoveredOnly = !e.showDiscoveredOnly
                    }
                }
            }, [t("img", {
                staticClass: "sidebar-sorting-icon",
                attrs: {
                    src: "/infinite-craft/magic.svg"
                }
            }), e._v("\n          Discoveries\n        ")]), e._v(" "), t("div", {
                staticClass: "sidebar-sort sidebar-sorting-item",
                on: {
                    click: e.changeSort
                }
            }, [t("img", {
                staticClass: "sidebar-sorting-icon",
                attrs: {
                    src: "/infinite-craft/".concat(e.sortBy, ".svg")
                }
            }), e._v("\n          Sort by " + e._s(e.sortBy) + "\n        ")])]), e._v(" "), t("div", {
                staticClass: "sidebar-search"
            }, [t("input", {
                directives: [{
                    name: "model",
                    rawName: "v-model",
                    value: e.searchQuery,
                    expression: "searchQuery"
                }],
                ref: "search",
                staticClass: "sidebar-input",
                attrs: {
                    placeholder: "Search ".concat(e.sortedElements.length > 1 ? "(" + (e.searchResults.length || e.filteredElements.length) + ") " : "", "items...")
                },
                domProps: {
                    value: e.searchQuery
                },
                on: {
                    input: function(t) {
                        t.target.composing || (e.searchQuery = t.target.value)
                    }
                }
            }), e._v(" "), t("img", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.searchQuery.length > 0,
                    expression: "searchQuery.length > 0"
                }],
                staticClass: "sidebar-input-close",
                attrs: {
                    src: "/infinite-craft/close.svg"
                },
                on: {
                    click: function(t) {
                        e.searchQuery = ""
                    }
                }
            })])])]), e._v(" "), t("div", {
                staticClass: "instances",
                on: {
                    contextmenu: function(e) {
                        return e.preventDefault(),
                        !1
                    }
                }
            }, [t("transition-group", {
                attrs: {
                    name: "instance-anim",
                    tag: "div"
                }
            }, e._l(e.instances, (function(n, i) {
                return t("div", {
                    key: n.id,
                    staticClass: "item instance",
                    class: {
                        "instance-disabled": n.disabled,
                        "instance-new": n.isNew,
                        "instance-hide": n.hide,
                        "instance-discovered": n.discovered
                    },
                    attrs: {
                        id: "instance-" + n.id
                    },
                    on: {
                        mousedown: function(t) {
                            return e.selectInstance(t, n)
                        },
                        touchstart: function(t) {
                            return e.selectInstance(t, n)
                        },
                        dblclick: function(t) {
                            return e.duplicateInstance(n)
                        }
                    }
                }, [t("span", {
                    staticClass: "instance-emoji"
                }, [e._v(e._s(n.emoji || "⬜"))]), e._v("\n        " + e._s(n.text) + "\n        "), n.discovered ? t("div", {
                    staticClass: "instance-discovered-text"
                }, [t("img", {
                    staticClass: "instance-discovered-emoji",
                    attrs: {
                        src: "/infinite-craft/magic.svg"
                    }
                }), e._v("First Discovery\n        ")]) : e._e()])
            }
            )), 0)], 1), e._v(" "), t("transition", {
                attrs: {
                    name: "pinwheel-animation"
                }
            }, [e.showPinwheel ? t("img", {
                ref: "pinwheel",
                staticClass: "pinwheel",
                attrs: {
                    src: "/infinite-craft/pinwheel.png"
                }
            }) : e._e()]), e._v(" "), t("div", {
                staticClass: "mobile-sound",
                on: {
                    click: e.toggleSound
                }
            }, [t("img", {
                staticClass: "sound",
                attrs: {
                    src: e.isMuted ? "/infinite-craft/mute.svg" : "/infinite-craft/sound.svg"
                }
            })]), e._v(" "), t("img", {
                staticClass: "logo",
                attrs: {
                    src: "/infinite-craft/logo.svg"
                }
            }), e._v(" "), t("div", {
                staticClass: "reset",
                on: {
                    click: e.reset
                }
            }, [e._v("Reset")]), e._v(" "), e.isMobile ? t("transition-group", {
                staticClass: "mobile-items",
                attrs: {
                    name: "list",
                    tag: "div"
                }
            }, e._l(e.sortedElements, (function(element, i) {
                var n, r, o;
                return t("div", {
                    key: element.text,
                    staticClass: "mobile-item"
                }, [t("div", {
                    staticClass: "item",
                    class: {
                        "item-selected-mobile": (null === (n = e.firstSelected) || void 0 === n ? void 0 : n.text) === element.text || (null === (r = e.secondSelected) || void 0 === r ? void 0 : r.text) === element.text,
                        "item-crafted-mobile": (null === (o = e.mobileCraftedElement) || void 0 === o ? void 0 : o.text) === element.text,
                        "mobile-is-crafting": e.mobileIsCrafting
                    },
                    attrs: {
                        id: "item-" + element.text
                    },
                    on: {
                        click: function(t) {
                            return e.mobileSelect(t, element)
                        }
                    }
                }, [t("span", {
                    staticClass: "item-emoji-mobile"
                }, [e._v(e._s(element.emoji || "⬜"))]), e._v("\n        " + e._s(element.text) + "\n      ")])])
            }
            )), 0) : e._e(), e._v(" "), e.hasCrafted ? e._e() : t("div", {
                staticClass: "mobile-instruction"
            }, [e._v("\n    Tap two elements to craft\n  ")])], 1)
        }
        ), [], !1, null, "2f8bc7f9", null);
        t.default = component.exports;
        installComponents(component, {
            Ad: n(280).default
        })
    },
    276: function(e, t, n) {
        "use strict";
        var r = n(2)
          , o = n(19)
          , c = n(9)
          , d = n(6)
          , path = n(203)
          , l = n(4)
          , f = n(109)
          , h = n(12)
          , v = n(201)
          , m = n(39)
          , x = n(81)
          , w = n(202)
          , y = n(3)
          , I = n(80).f
          , k = n(29).f
          , S = n(21).f
          , C = n(281)
          , _ = n(282).trim
          , E = "Number"
          , M = d[E]
          , z = path[E]
          , j = M.prototype
          , D = d.TypeError
          , O = l("".slice)
          , P = l("".charCodeAt)
          , N = function(e) {
            var t = w(e, "number");
            return "bigint" == typeof t ? t : R(t)
        }
          , R = function(e) {
            var t, n, r, o, c, d, l, code, f = w(e, "number");
            if (x(f))
                throw D("Cannot convert a Symbol value to a number");
            if ("string" == typeof f && f.length > 2)
                if (f = _(f),
                43 === (t = P(f, 0)) || 45 === t) {
                    if (88 === (n = P(f, 2)) || 120 === n)
                        return NaN
                } else if (48 === t) {
                    switch (P(f, 1)) {
                    case 66:
                    case 98:
                        r = 2,
                        o = 49;
                        break;
                    case 79:
                    case 111:
                        r = 8,
                        o = 55;
                        break;
                    default:
                        return +f
                    }
                    for (d = (c = O(f, 2)).length,
                    l = 0; l < d; l++)
                        if ((code = P(c, l)) < 48 || code > o)
                            return NaN;
                    return parseInt(c, r)
                }
            return +f
        }
          , A = f(E, !M(" 0o1") || !M("0b1") || M("+0x1"))
          , $ = function(e) {
            return m(j, e) && y((function() {
                C(e)
            }
            ))
        }
          , L = function(e) {
            var t = arguments.length < 1 ? 0 : M(N(e));
            return $(this) ? v(Object(t), this, L) : t
        };
        L.prototype = j,
        A && !o && (j.constructor = L),
        r({
            global: !0,
            constructor: !0,
            wrap: !0,
            forced: A
        }, {
            Number: L
        });
        var T = function(e, source) {
            for (var t, n = c ? I(source) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","), r = 0; n.length > r; r++)
                h(source, t = n[r]) && !h(e, t) && S(e, t, k(source, t))
        };
        o && z && T(path[E], z),
        (A || o) && T(path[E], M)
    },
    277: function(e, t, n) {
        var content = n(286);
        content.__esModule && (content = content.default),
        "string" == typeof content && (content = [[e.i, content, ""]]),
        content.locals && (e.exports = content.locals);
        (0,
        n(108).default)("f68e4eaa", content, !0, {
            sourceMap: !1
        })
    },
    280: function(e, t, n) {
        "use strict";
        n.r(t);
        n(276);
        var r = {
            props: {
                slotId: {
                    type: String,
                    required: !0
                },
                adFormat: {
                    type: String,
                    required: !0
                },
                isResponsive: {
                    type: Boolean,
                    required: !1,
                    default: !1
                },
                adStyle: {
                    type: String,
                    required: !0
                },
                minWidth: {
                    type: Number,
                    required: !1,
                    default: -1
                },
                maxWidth: {
                    type: Number,
                    required: !1,
                    default: -1
                }
            },
            data: function() {
                return {
                    hideAd: !1,
                    shouldShow: this.shouldShowAd()
                }
            },
            mounted: function() {
                var e = this;
                this.createAds(),
                this.$addEventListener("resize", (function() {
                    e.hideAd = !e.shouldShowAd()
                }
                ))
            },
            watch: {
                $route: function() {
                    this.firstLoad = !1,
                    this.createAds()
                }
            },
            methods: {
                createAds: function() {
                    var e = this;
                    this.$nextTick((function() {
                        e.shouldShowAd() && (window.adsbygoogle = window.adsbygoogle || [],
                        adsbygoogle.push({}))
                    }
                    ))
                },
                shouldShowAd: function() {
                    return (-1 === this.minWidth || window.innerWidth >= this.minWidth) && (-1 === this.maxWidth || window.innerWidth < this.maxWidth)
                }
            },
            beforeDestroy: function() {
                window.top.__vm_remove = window.top.__vm_remove || [],
                window.top.__vm_remove.push(this.$refs.adPlacement)
            }
        }
          , o = (n(285),
        n(28))
          , component = Object(o.a)(r, (function() {
            var e = this
              , t = e._self._c;
            return t("client-only", [e.shouldShow ? t("ins", {
                staticClass: "adsbygoogle",
                class: {
                    hide: e.hideAd
                },
                style: e.adStyle,
                attrs: {
                    "data-ad-client": "ca-pub-1851068468056357",
                    "data-ad-slot": e.slotId,
                    "data-ad-format": e.adFormat,
                    "data-full-width-responsive": e.isResponsive
                }
            }) : t("div")])
        }
        ), [], !1, null, "8af1cc2e", null);
        t.default = component.exports
    },
    281: function(e, t, n) {
        var r = n(4);
        e.exports = r(1..valueOf)
    },
    282: function(e, t, n) {
        var r = n(4)
          , o = n(24)
          , c = n(13)
          , d = n(283)
          , l = r("".replace)
          , f = RegExp("^[" + d + "]+")
          , h = RegExp("(^|[^" + d + "])[" + d + "]+$")
          , v = function(e) {
            return function(t) {
                var n = c(o(t));
                return 1 & e && (n = l(n, f, "")),
                2 & e && (n = l(n, h, "$1")),
                n
            }
        };
        e.exports = {
            start: v(1),
            end: v(2),
            trim: v(3)
        }
    },
    283: function(e, t) {
        e.exports = "\t\n\v\f\r                　\u2028\u2029\ufeff"
    },
    284: function(e, t, n) {
        "use strict";
        n.d(t, "a", (function() {
            return d
        }
        ));
        var r = n(111);
        var o = n(137)
          , c = n(82);

        function d(e) {
            return function(e) {
                if (Array.isArray(e))
                    return Object(r.a)(e)
            }(e) || Object(o.a)(e) || Object(c.a)(e) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
    },
    285: function(e, t, n) {
        "use strict";
        n(277)
    },
    286: function(e, t, n) {
        var r = n(107)(!1);
        r.push([e.i, ".hide[data-v-8af1cc2e]{display:none!important}", ""]),
        e.exports = r
    },
    303: function(e, t, n) {
        var r = n(2)
          , o = n(304)
          , c = n(112);
        r({
            target: "Array",
            proto: !0
        }, {
            fill: o
        }),
        c("fill")
    },
    304: function(e, t, n) {
        "use strict";
        var r = n(25)
          , o = n(84)
          , c = n(31);
        e.exports = function(e) {
            for (var t = r(this), n = c(t), d = arguments.length, l = o(d > 1 ? arguments[1] : void 0, n), f = d > 2 ? arguments[2] : void 0, h = void 0 === f ? n : o(f, n); h > l; )
                t[l++] = e;
            return t
        }
    },
    311: function(e, t, n) {
        var r = n(61).match(/firefox\/(\d+)/i);
        e.exports = !!r && +r[1]
    },
    312: function(e, t, n) {
        var r = n(61);
        e.exports = /MSIE|Trident/.test(r)
    },
    313: function(e, t, n) {
        var r = n(61).match(/AppleWebKit\/(\d+)\./);
        e.exports = !!r && +r[1]
    },
    314: function(e, t, n) {
        "use strict";
        var r = n(2)
          , o = n(4)
          , c = n(35)
          , d = n(25)
          , l = n(31)
          , f = n(206)
          , h = n(13)
          , v = n(3)
          , m = n(205)
          , x = n(141)
          , w = n(311)
          , y = n(312)
          , I = n(85)
          , k = n(313)
          , S = []
          , C = o(S.sort)
          , _ = o(S.push)
          , E = v((function() {
            S.sort(void 0)
        }
        ))
          , M = v((function() {
            S.sort(null)
        }
        ))
          , z = x("sort")
          , j = !v((function() {
            if (I)
                return I < 70;
            if (!(w && w > 3)) {
                if (y)
                    return !0;
                if (k)
                    return k < 603;
                var code, e, t, n, r = "";
                for (code = 65; code < 76; code++) {
                    switch (e = String.fromCharCode(code),
                    code) {
                    case 66:
                    case 69:
                    case 70:
                    case 72:
                        t = 3;
                        break;
                    case 68:
                    case 71:
                        t = 4;
                        break;
                    default:
                        t = 2
                    }
                    for (n = 0; n < 47; n++)
                        S.push({
                            k: e + n,
                            v: t
                        })
                }
                for (S.sort((function(a, b) {
                    return b.v - a.v
                }
                )),
                n = 0; n < S.length; n++)
                    e = S[n].k.charAt(0),
                    r.charAt(r.length - 1) !== e && (r += e);
                return "DGBEFHACIJK" !== r
            }
        }
        ));
        r({
            target: "Array",
            proto: !0,
            forced: E || !M || !z || !j
        }, {
            sort: function(e) {
                void 0 !== e && c(e);
                var t = d(this);
                if (j)
                    return void 0 === e ? C(t) : C(t, e);
                var n, r, o = [], v = l(t);
                for (r = 0; r < v; r++)
                    r in t && _(o, t[r]);
                for (m(o, function(e) {
                    return function(t, n) {
                        return void 0 === n ? -1 : void 0 === t ? 1 : void 0 !== e ? +e(t, n) || 0 : h(t) > h(n) ? 1 : -1
                    }
                }(e)),
                n = l(o),
                r = 0; r < n; )
                    t[r] = o[r++];
                for (; r < v; )
                    f(t, r++);
                return t
            }
        })
    },
    338: function(e, t, n) {
        "use strict";
        var r = n(2)
          , o = n(282).trim;
        r({
            target: "String",
            proto: !0,
            forced: n(343)("trim")
        }, {
            trim: function() {
                return o(this)
            }
        })
    },
    343: function(e, t, n) {
        var r = n(89).PROPER
          , o = n(3)
          , c = n(283);
        e.exports = function(e) {
            return o((function() {
                return !!c[e]() || "​᠎" !== "​᠎"[e]() || r && c[e].name !== e
            }
            ))
        }
    },
    383: function(e, t, n) {
        "use strict";
        var r = n(2)
          , o = n(66).findIndex
          , c = n(112)
          , d = "findIndex"
          , l = !0;
        d in [] && Array(1)[d]((function() {
            l = !1
        }
        )),
        r({
            target: "Array",
            proto: !0,
            forced: l
        }, {
            findIndex: function(e) {
                return o(this, e, arguments.length > 1 ? arguments[1] : void 0)
            }
        }),
        c(d)
    },
    506: function(e, t, n) {
        var content = n(986);
        content.__esModule && (content = content.default),
        "string" == typeof content && (content = [[e.i, content, ""]]),
        content.locals && (e.exports = content.locals);
        (0,
        n(108).default)("100f6cd7", content, !0, {
            sourceMap: !1
        })
    },
    507: function(e, t, n) {
        var content = n(988);
        content.__esModule && (content = content.default),
        "string" == typeof content && (content = [[e.i, content, ""]]),
        content.locals && (e.exports = content.locals);
        (0,
        n(108).default)("dee6d83a", content, !0, {
            sourceMap: !1
        })
    },
    985: function(e, t, n) {
        "use strict";
        n(506)
    },
    986: function(e, t, n) {
        var r = n(107)(!1);
        r.push([e.i, "@keyframes itemMobileJiggle{0%{transform:rotate(0deg)}25%{transform:rotate(2deg)}50%{transform:rotate(0deg)}75%{transform:rotate(-2deg)}to{transform:rotate(0deg)}}", ""]),
        e.exports = r
    },
    987: function(e, t, n) {
        "use strict";
        n(507)
    },
    988: function(e, t, n) {
        var r = n(107)(!1);
        r.push([e.i, '.container[data-v-2f8bc7f9]{position:fixed;top:0;left:0;width:100%;height:100%;font-family:"Roboto",sans-serif;-webkit-user-select:none;-moz-user-select:none;user-select:none;--text-color:#040404;--background-color:#fff;--border-color:#c8c8c8;--item-bg:#fff;--instance-bg:linear-gradient(0deg,#f7feff,#fff 70%);--instance-bg-hover:linear-gradient(0deg,#d6fcff,#fff 90%);--instance-border:#91a8c1;--instance-border-hover:#91a8c1;--sidebar-bg:hsla(0,0%,100%,0.93);--discoveries-bg-active:#fff9ea;background:var(--background-color);color:var(--text-color)}.container.dark-mode[data-v-2f8bc7f9]{--border-color:#d1d1d1;--item-bg:#000;--instance-bg:linear-gradient(180deg,#22252b,#000 80%);--instance-bg-hover:linear-gradient(180deg,#3d4249,#000 80%);--instance-border:#dcdcdc;--instance-border-hover:#c7e0ff;--sidebar-bg:#000;--background-color:#000;--discoveries-bg-active:#423a24;--text-color:#fff}.sidebar[data-v-2f8bc7f9]{position:fixed;top:0;right:0;width:305px;height:100vh;z-index:10;overflow-y:scroll;overflow-x:visible;background:var(--sidebar-bg);border-left:1px solid var(--border-color);contain:strict}.logo[data-v-2f8bc7f9]{position:fixed;top:10px;right:320px;width:80px;-webkit-user-select:none;-moz-user-select:none;user-select:none;pointer-events:none}.dark-mode .logo[data-v-2f8bc7f9]{filter:invert(1)}.mobile-items[data-v-2f8bc7f9]{display:none}.items[data-v-2f8bc7f9]{max-width:900px;margin-left:auto;margin-right:auto;padding:9px;min-height:calc(100svh - 71px);line-height:.5em}.item[data-v-2f8bc7f9]{margin:4px;cursor:pointer;padding:8px 8px 7px;border-radius:5px;display:inline-block;-webkit-user-select:none;-moz-user-select:none;user-select:none;border:1px solid var(--border-color);transition:background .15s linear;background:var(--item-bg);line-height:1em;contain:layout style paint}.item[data-v-2f8bc7f9],.item-emoji[data-v-2f8bc7f9]{font-size:15.4px}.items:not(.is-delete-mode) .item-hidden[data-v-2f8bc7f9]{display:none}.is-delete-mode .item-hidden[data-v-2f8bc7f9]{opacity:.35}.is-delete-mode .item[data-v-2f8bc7f9]{contain:layout style;position:relative}.item-remove[data-v-2f8bc7f9]{position:absolute;right:-6px;top:-6px;width:17px;height:17px;background-color:#22252b;border-radius:100%;background-image:url(/infinite-craft/close-white.svg);background-size:13px 13px;background-position:2px 2px;background-repeat:no-repeat;font-size:12px;cursor:pointer}.item-remove[data-v-2f8bc7f9]:hover{transform:scale(1.07)}.dark-mode .item-remove[data-v-2f8bc7f9]{background-color:#fff;background-image:url(/infinite-craft/close.svg)}@keyframes itemRemoveScale-2f8bc7f9{0%{scale:0}to{scale:1}}.is-delete-mode .item[data-v-2f8bc7f9]:hover{background:none;border:1px solid #c8c8c8;cursor:auto}.instance[data-v-2f8bc7f9]{position:fixed;font-size:18px;z-index:11;left:0;top:0;padding:11px 10px 10px;transition:scale .15s ease-in;border-radius:5px;transform-origin:center center;display:flex;align-items:center;contain:layout;border:1px solid var(--instance-border);background:var(--instance-bg)}.instance[data-v-2f8bc7f9],.instance-discovered-text[data-v-2f8bc7f9]{-webkit-user-select:none;-moz-user-select:none;user-select:none}.instance-discovered-text[data-v-2f8bc7f9]{position:absolute;bottom:-3px;transform:translate(-50%,100%);left:50%;width:100%;text-align:center;font-size:12px;width:110px}.instance-discovered-emoji[data-v-2f8bc7f9]{width:12px;position:relative;top:1px;margin-right:3px}.dark-mode .instance-discovered-emoji[data-v-2f8bc7f9]{filter:invert(1)}.pinwheel[data-v-2f8bc7f9]{position:fixed;top:0;left:0;width:130px;height:130px;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;z-index:1;animation:pinwheelSpin-2f8bc7f9 2s linear infinite;transition:scale .4s ease-in-out,opacity .4s ease-in-out;scale:0;opacity:0;transform-origin:center center}.pinwheel-animation-enter-active[data-v-2f8bc7f9],.pinwheel-animation-leave-active[data-v-2f8bc7f9]{scale:1;opacity:1}.pinwheel-animation-enter-from[data-v-2f8bc7f9],.pinwheel-animation-leave-to[data-v-2f8bc7f9]{scale:0;opacity:0}@keyframes pinwheelSpin-2f8bc7f9{to{rotate:90deg}}@keyframes scaleIn-2f8bc7f9{0%{scale:.5}to{scale:1}}@media (hover:hover){.item[data-v-2f8bc7f9]:hover{background:var(--instance-bg-hover);border:1px solid var(--instance-border-hover)}}.item-selected[data-v-2f8bc7f9]{background:#e3e3e3}.instruction[data-v-2f8bc7f9]{font-size:14px;text-align:center;margin-top:25px;-webkit-user-select:none;-moz-user-select:none;user-select:none;pointer-events:none;border-radius:5px;padding:9px 0;border:1px solid var(--border-color);width:calc(100% - 10px);margin-left:auto;margin-right:auto;line-height:1.2em}.instruction-icon[data-v-2f8bc7f9]{width:16px;position:relative;top:3px;margin-right:5px;margin-top:-3px}.dark-mode .instruction-icon[data-v-2f8bc7f9]{filter:invert(1)}.empty-sidebar[data-v-2f8bc7f9]{position:absolute;left:50%;transform:translateX(-50%);font-size:15px;text-align:center;-webkit-user-select:none;-moz-user-select:none;user-select:none;pointer-events:none;top:25px}.instance-disabled[data-v-2f8bc7f9]{pointer-events:none;opacity:.7;transition:.15s linear;animation:pulse-2f8bc7f9 .8s ease-in-out .15s infinite alternate-reverse}@keyframes pulse-2f8bc7f9{0%{opacity:.2}to{opacity:.7}}.instance-disabled[data-v-2f8bc7f9]:after{content:"";position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.instance-hover[data-v-2f8bc7f9]{scale:1.04;background:var(--instance-bg-hover);border:1px solid var(--instance-border-hover)}.site-title[data-v-2f8bc7f9]{position:fixed;top:13px;left:13px;width:110px;-webkit-user-select:none;-moz-user-select:none;user-select:none}.site-title[data-v-2f8bc7f9]:hover{transform:scale(1.03)}.dark-mode .site-title[data-v-2f8bc7f9]{filter:invert(1)}.side-controls[data-v-2f8bc7f9]{position:fixed;right:314px;bottom:7px;-webkit-user-select:none;-moz-user-select:none;user-select:none;display:flex;grid-gap:19px}.dark-mode .side-controls[data-v-2f8bc7f9]{filter:invert(1)}.clear[data-v-2f8bc7f9],.sound[data-v-2f8bc7f9]{width:21px;cursor:pointer;opacity:.8;-webkit-user-select:none;-moz-user-select:none;user-select:none}.sound[data-v-2f8bc7f9]{transform:scale(.92)}.dark-mode-icon[data-v-2f8bc7f9]{width:21px;cursor:pointer}.coffee[data-v-2f8bc7f9]{width:15px}.coffee-link[data-v-2f8bc7f9]{line-height:0}.clear[data-v-2f8bc7f9]:hover,.coffee[data-v-2f8bc7f9]:hover,.dark-mode-icon[data-v-2f8bc7f9]:hover,.sound[data-v-2f8bc7f9]:hover,.trash[data-v-2f8bc7f9]:hover{transform:scale(1.05)}.mobile-sound[data-v-2f8bc7f9]{position:fixed;bottom:10px;right:10px;width:40px;height:40px;border-radius:5px;background:#fff;z-index:10;display:flex;align-items:center;justify-content:center;border:1px solid #9f9f9f;display:none}.sidebar-controls[data-v-2f8bc7f9]{position:sticky;bottom:0;left:0;width:100%;font-size:13px;text-align:right;-webkit-user-select:none;-moz-user-select:none;user-select:none;background:var(--sidebar-bg)}.sidebar-controls[data-v-2f8bc7f9]:after{content:"";position:absolute;top:-30px;left:0;width:100%;height:30px;background:linear-gradient(180deg,hsla(0,0%,100%,0),hsla(0,0%,100%,.9));pointer-events:none;opacity:0;transition:opacity .15s linear}.dark-mode .sidebar-controls[data-v-2f8bc7f9]:after{background:linear-gradient(180deg,transparent,rgba(0,0,0,.9))}.sidebar-controls-fade-show[data-v-2f8bc7f9]:after{opacity:1}.sidebar-search[data-v-2f8bc7f9]{display:flex;align-items:center;justify-content:right;position:relative;background:var(--background-color)}.sidebar-sorting[data-v-2f8bc7f9]{display:grid;grid-template-columns:1fr 1fr;text-align:center;border-top:1px solid var(--border-color);cursor:pointer;grid-gap:1px;background:var(--border-color)}.sidebar-sorting-item[data-v-2f8bc7f9]{padding:7px 0;background:var(--background-color)}.sidebar-discoveries-active[data-v-2f8bc7f9]{background:var(--discoveries-bg-active)}.sidebar-input[data-v-2f8bc7f9]{width:100%;font-size:15px;border:1px solid var(--border-color);border-left:none;border-right:none;border-bottom:none;outline:none;padding:0 20px 0 40px;height:40px;line-height:18px;position:relative;background:url(/infinite-craft/search.svg) no-repeat 22px 22px;background-size:21px 21px;background-position:10px 10px;color:var(--text-color)}.sidebar-input[data-v-2f8bc7f9]::-moz-placeholder{opacity:.5}.sidebar-input[data-v-2f8bc7f9]::placeholder{opacity:.5}.dark-mode .sidebar-input[data-v-2f8bc7f9]::-moz-placeholder{opacity:.75}.dark-mode .sidebar-input[data-v-2f8bc7f9]::placeholder{opacity:.75}.sidebar-input[data-v-2f8bc7f9]:after{content:"";left:10px;top:50%;font-size:20px;pointer-events:none}.sidebar-input-close[data-v-2f8bc7f9],.sidebar-input[data-v-2f8bc7f9]:after{position:absolute;transform:translateY(-50%);-webkit-user-select:none;-moz-user-select:none;user-select:none}.sidebar-input-close[data-v-2f8bc7f9]{right:10px;top:calc(50% + 1px);cursor:pointer;opacity:.45;width:15px}.dark-mode .sidebar-input-close[data-v-2f8bc7f9]{filter:invert(1)}.sort[data-v-2f8bc7f9]{cursor:pointer;padding:2px;opacity:.9;font-size:14px}.sort-img[data-v-2f8bc7f9]{height:15px;top:2px;padding:2px;-webkit-user-select:none;-moz-user-select:none;user-select:none;position:relative}.instance-emoji[data-v-2f8bc7f9]{font-size:21px;margin-right:5px}.instance-hide[data-v-2f8bc7f9]{display:none!important;pointer-events:none!important}.mobile-instruction[data-v-2f8bc7f9]{display:none}.list-enter[data-v-2f8bc7f9],.list-leave-to[data-v-2f8bc7f9]{transform:scale(0)}.particles[data-v-2f8bc7f9]{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none}.instance-anim-enter-active[data-v-2f8bc7f9]{animation:scaleIn-2f8bc7f9 .13s ease-in 1 forwards}.instance-anim-leave-to[data-v-2f8bc7f9]{opacity:0;scale:0}.instance-anim-leave-active[data-v-2f8bc7f9]{transition:opacity .16s linear,scale .16s linear}.reset[data-v-2f8bc7f9]{position:fixed;left:10px;bottom:10px;cursor:pointer;opacity:.7;font-size:15px}.sidebar-sorting-icon[data-v-2f8bc7f9]{height:13px;line-height:0;position:relative;top:2px;margin-right:1px;-webkit-user-select:none;-moz-user-select:none;user-select:none;pointer-events:none}.dark-mode .sidebar-sorting-icon[data-v-2f8bc7f9]{filter:invert(1)}.empty-sidebar-icon[data-v-2f8bc7f9]{width:22px;position:relative;top:5px;margin-right:5px;margin-top:-5px}.trash[data-v-2f8bc7f9]{width:19px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none}.trash-active[data-v-2f8bc7f9]{animation:sway-2f8bc7f9 .3s linear infinite alternate-reverse}.dark-mode .empty-sidebar-icon[data-v-2f8bc7f9]{filter:invert(1)}@keyframes sway-2f8bc7f9{0%{rotate:-6deg}to{rotate:6deg}}@media screen and (min-width:1150px){.sidebar[data-v-2f8bc7f9]{width:350px}.logo[data-v-2f8bc7f9]{right:362px;width:85px}.item[data-v-2f8bc7f9]{font-size:16.4px;padding:9px 10px 8px}.items[data-v-2f8bc7f9]{min-height:calc(100svh - 76px)}.item-emoji[data-v-2f8bc7f9]{font-size:16.4px}.instance[data-v-2f8bc7f9]{font-size:19.5px;padding:11px 11px 10px}.instruction[data-v-2f8bc7f9]{font-size:15px}.pinwheel[data-v-2f8bc7f9]{width:145px;height:145px}.instance-discovered-text[data-v-2f8bc7f9]{font-size:13px}.side-controls[data-v-2f8bc7f9]{right:361px}.clear[data-v-2f8bc7f9],.sound[data-v-2f8bc7f9]{width:23px}.dark-mode-icon[data-v-2f8bc7f9]{width:22px}.coffee[data-v-2f8bc7f9]{width:16px}.trash[data-v-2f8bc7f9]{width:20px}.sidebar-input[data-v-2f8bc7f9]{background-size:23px 23px;background-position:11px 12px;height:45px;font-size:16px;line-height:21px;padding-left:43px;padding-top:2px}.sidebar-input-close[data-v-2f8bc7f9]{width:18px;right:12px}.empty-sidebar[data-v-2f8bc7f9]{font-size:16px}}@media screen and (max-width:800px){.container[data-v-2f8bc7f9]{position:static;min-height:100svh}.site-title[data-v-2f8bc7f9]{position:absolute}.sidebar[data-v-2f8bc7f9]{display:none}.mobile-items[data-v-2f8bc7f9]{display:flex;flex-wrap:wrap;justify-content:center;grid-gap:5px 5px;padding:105px 5px 20px;position:relative;z-index:2}.mobile-item[data-v-2f8bc7f9]{transition:transform .4s ease}.item[data-v-2f8bc7f9]{display:flex;align-items:center;min-height:37px;grid-gap:5px;line-height:0;font-size:15.5px;padding:1px 9px 0;border:1px solid #9f9f9f;color:var(--text-color);transition:background .1s linear}.item-selected-mobile[data-v-2f8bc7f9]{top:5px}.item-crafted-mobile[data-v-2f8bc7f9],.item-selected-mobile[data-v-2f8bc7f9]{background-color:#fffae6;border-color:#877f64;position:sticky;bottom:5px}.item-crafted-mobile[data-v-2f8bc7f9]{z-index:10;transition:background .2s linear}.dark-mode .item-selected[data-v-2f8bc7f9],.dark-mode .item-selected-mobile[data-v-2f8bc7f9]{background-color:#423a24;border-color:#877f64}.item-emoji-mobile[data-v-2f8bc7f9]{margin-right:1px}.particles[data-v-2f8bc7f9]{z-index:1}.side-controls[data-v-2f8bc7f9],.sidebar-controls[data-v-2f8bc7f9]{display:none}.logo[data-v-2f8bc7f9]{position:absolute;right:10px;left:auto;top:10px}.mobile-instruction[data-v-2f8bc7f9]{display:block;max-width:200px;text-align:center;border:1px solid var(--border-color);background-color:#fffae6;padding:7px;margin-left:auto;margin-right:auto;font-size:15px;border-radius:5px}.mobile-sound[data-v-2f8bc7f9]{display:flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:transparent}.instance[data-v-2f8bc7f9]{display:none}}', ""]),
        e.exports = r
    }
}]);
