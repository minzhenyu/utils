// detectZoom.js
export const detectZoom = () => {
	let ratio = 0
	const screen = window.screen
	const ua = navigator.userAgent.toLowerCase()
	if (window.devicePixelRatio !== undefined) {
		ratio = window.devicePixelRatio
	} else if (~ua.indexOf('msie')) {
		if (screen.deviceXDPI && screen.logicalXDPI) {
			ratio = screen.deviceXDPI / screen.logicalXDPI
		}
	} else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
		ratio = window.outerWidth / window.innerWidth
	}
	if (ratio) {
		ratio = Math.round(ratio * 100)
	}
	return ratio
}

// 使用
// // 适配屏幕大小
// import { detectZoom } from '@/utils/detectZoom'
// // 处理笔记本系统默认系统比例为125%或150%带来的布局影响
// const m = detectZoom()
// document.body.style.zoom = 100 / Number(m)
