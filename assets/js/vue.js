import { createApp } from "vue/dist/vue.esm-bundler.js";
import { Modal } from "bootstrap";
import axios from "axios";
import Fuse from "fuse.js";

createApp({
	// use different delimiters so not to conflict with hugo
	delimiters: ["[[", "]]"],

	data() {
		return {
			theme: localStorage.getItem("theme") ? localStorage.getItem("theme") : "auto",
			search: "",
			fuse: false,
			loaded: false,
		};
	},

	computed: {
		searchResults() {
			if (this.search === "") {
				return [];
			}

			document.querySelectorAll("#searchModal .list-group-item").forEach((e) => e.classList.remove("active"));

			const r = this.fuse.search(this.search);

			if (r.length > 5) {
				return r.slice(0, 5);
			}

			return r;
		},
	},

	watch: {
		theme(v) {
			if (
				(this.theme === "dark" && window.matchMedia("(prefers-color-scheme: dark)").matches) ||
				(this.theme === "light" && window.matchMedia("(prefers-color-scheme: light)").matches)
			) {
				localStorage.removeItem("theme");
			} else {
				localStorage.setItem("theme", v);
			}
			this.setTheme();
		},

		search() {
			this.$nextTick(() => {
				this.selectNext();
			});
		},
	},

	mounted() {
		this.setTheme();
	},

	methods: {
		setTheme() {
			if (this.theme === "auto") {
				if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
					this.theme = "dark";
				} else {
					this.theme = "light";
				}
			}
			document.documentElement.setAttribute("data-bs-theme", this.theme);

			const pictures = document.querySelectorAll("picture");

			pictures.forEach((picture) => {
				const sources = document.querySelectorAll(`
					source[media*="prefers-color-scheme"],
					source[data-media*="prefers-color-scheme"]
				`);

				sources.forEach((source) => {
					// Preserve the source `media` as a data-attribute
					// to be able to switch between preferences
					if (source?.media.includes("prefers-color-scheme")) {
						source.dataset.media = source.media;
					}

					// If the source element `media` target is the `preference`,
					// override it to 'all' to show
					// or set it to 'none' to hide
					if (source?.dataset.media.includes(this.theme)) {
						source.media = "all";
					} else if (source) {
						source.media = "none";
					}
				});
			});
		},

		openSearch() {
			const e = document.getElementById("searchModal");
			const m = Modal.getOrCreateInstance(e);
			this.initSearch();
			m.show();
		},

		initSearch() {
			this.search = "";

			if (this.loaded) {
				window.setTimeout(() => {
					document.getElementById("Search").focus();
				}, 100);
				return;
			}

			axios
				.get("/index.json", {})
				.then((response) => {
					this.loaded = true;
					const options = {
						includeScore: true,
						distance: 10000,
						threshold: 0.5,
						keys: ["title", "keywords", "description", "body"],
					};

					this.fuse = new Fuse(response.data, options);
					window.setTimeout(() => {
						document.getElementById("Search").focus();
					}, 100);
				})
				.catch((err) => {
					alert(err);
				})
				.then(() => {
					// always executed
				});
		},

		gotoSelected() {
			const results = document.querySelectorAll("#searchModal .list-group-item");
			if (results.length === 0) {
				return;
			}
			results.forEach((r, i) => {
				if (r.classList.contains("active")) {
					r.click();
				}
			});
		},

		selectPrev() {
			const results = document.querySelectorAll("#searchModal .list-group-item");
			const nr = results.length;
			if (nr === 0) {
				return;
			}
			// find selected
			let hIndex = 0;
			results.forEach((r, i) => {
				if (r.classList.contains("active")) {
					r.classList.remove("active");
					hIndex = i - 1;
					if (hIndex < 0) {
						hIndex = nr - 1; // to end
					}
				}
			});

			results[hIndex].classList.add("active");
		},

		selectNext() {
			const results = document.querySelectorAll("#searchModal .list-group-item");
			const nr = results.length;
			if (nr === 0) {
				return;
			}
			// find selected
			let hIndex = 0;
			results.forEach((r, i) => {
				if (r.classList.contains("active")) {
					r.classList.remove("active");
					hIndex = i + 1;
					if (hIndex >= nr) {
						hIndex = 0; // back to start
					}
				}
			});

			results[hIndex].classList.add("active");
		},
	},
}).mount("#App");
