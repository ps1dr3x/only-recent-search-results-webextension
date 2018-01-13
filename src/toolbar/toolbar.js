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

    let currentRange = (await browser.storage.local.get('currentRange')).currentRange
    document.querySelector(`.range-select [value="${currentRange}"]`).selected = true
}
document.addEventListener('DOMContentLoaded', restoreOptions)

async function changeRange(event) {
    let currentRange = event.target.value
    browser.storage.local.set({
        currentRange
    })

    let currentTabs = await browser.tabs.query({currentWindow: true})
    for (let tab of currentTabs) {
        if (tab.active
        && tab.url.indexOf('google.') !== -1
        && tab.url.indexOf('/search?') !== -1) {
            let url
            if (tab.url.indexOf('&tbs=qdr:') != -1)
                url = tab.url.replace(/(&tbs=qdr:)(.)/, `$1${currentRange}`)
            else
                url = `${tab.url}&tbs=qdr:${currentRange}`

            browser.tabs.update(tab.id, { url })
        }
    }
}
document.querySelector('.range-select').addEventListener('change', changeRange)

async function toggleActive(event) {
    let isActive = !((await browser.storage.local.get('isActive')).isActive)
    browser.storage.local.set({
        isActive
    })

    restoreOptions()
}
document.querySelector('.osrw-toggle').addEventListener('click', toggleActive)