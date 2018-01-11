/**
 * Only Recent Search Results
 **
 * @author      Michele Federici (@ps1dr3x) <michele@federici.tech>
 * @license     MIT
 * @source      https://github.com/ps1dr3x/only-recent-search-results-webextension
 */


async function restoreOptions() {
    let isActive = (await browser.storage.local.get('isActive')).isActive
    let toggleBtn = document.querySelector('.osrw-toggle')
    toggleBtn.innerText = isActive ? 'ON' : 'OFF'
    isActive ? toggleBtn.classList.add('active') : toggleBtn.classList.remove('active')
}
document.addEventListener('DOMContentLoaded', restoreOptions)

async function toggleActive(e) {
    let isActive = !((await browser.storage.local.get('isActive')).isActive || false)
    browser.storage.local.set({
        isActive
    })

    restoreOptions()
}
document.querySelector('.osrw-toggle').addEventListener('click', toggleActive)