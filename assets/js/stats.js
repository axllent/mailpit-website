import axios from "axios"

export default {

	data() {
		return {
			docker: false,
			error: false
		}
	},

	mounted() {
		if (document.getElementById('stats')) {
			this.loadDockerStats()
		}
	},

	computed: {
		dockerStats() {
			if (!this.docker) {
				return false
			}

			return this.docker.sort((a, b) => {
				return parseInt(a.LastDay) < parseInt(b.LastDay)
			})
		}
	},

	methods: {
		loadDockerStats: function () {
			const uri = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSC8ygTe_E-ojlOEnSL-ufH7AuRiY1uhGqfxTtNXYXVHpxUbVhwA4l8YEQlnG1Lzt1SbxS0lfKDhWq4/pub?gid=1860532678&single=true&output=csv'
			let self = this

			axios.get(uri, {})
				.then(function (response) {
					self.docker = self.csvToArray(response.data)
				})
				.catch(function (err) {
					self.error = err
				})
				.then(function () {
					// always executed
				})
		},

		csvToArray: function (csv) {
			const rows = csv.split('\r\n')
			const headers = rows[0].split(',')
			const arrayOfObjects = rows.slice(1).map(row => {
				const values = row.split(',')
				const obj = {}
				headers.forEach((header, index) => {
					obj[header] = values[index]
				});
				return obj
			})

			return arrayOfObjects
		},

		number_format: function (i) {
			return parseInt(i).toLocaleString(
				undefined, // leave undefined to use the visitor's browser
				// locale or a string like 'en-US' to override it.
				{ minimumFractionDigits: 0 }
			)
		}
	}
}
