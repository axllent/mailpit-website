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
		loadDockerStats() {
			const uri = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSC8ygTe_E-ojlOEnSL-ufH7AuRiY1uhGqfxTtNXYXVHpxUbVhwA4l8YEQlnG1Lzt1SbxS0lfKDhWq4/pub?gid=1860532678&single=true&output=csv'

			axios.get(uri, {})
				.then((response) => {
					this.docker = this.csvToArray(response.data)
				})
				.catch((err) => {
					this.error = err
				})
				.then(function () {
					// always executed
				})
		},

		csvToArray(csv) {
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

		number_format(i) {
			return parseInt(i).toLocaleString(
				undefined, // leave undefined to use the visitor's browser
				// locale or a string like 'en-US' to override it.
				{ minimumFractionDigits: 0 }
			)
		}
	}
}
