import "./vue"
import "bootstrap"

window.addEventListener('DOMContentLoaded', () => {
	// open external links in new window
	const l = document.getElementsByTagName("a")
	const len = l.length;
	for (i = 0; i < len; ++i) {
		const a = l[i];
		if (a.href && !a.target && (a.href.indexOf(location.host) == -1 && a.href.match(/^https?\:\/\//i))) {
			a.target = "_blank";
			a.rel += a.rel ? !a.rel.match(/noopener/i) ? " noopener" : '' : 'noopener';
		}
	}
})
