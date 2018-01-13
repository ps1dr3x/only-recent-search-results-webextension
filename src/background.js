/**
 * Only Recent Search Results
 **
 * @author      Michele Federici (@ps1dr3x) <michele@federici.tech>
 * @license     MIT
 * @source      https://github.com/ps1dr3x/only-recent-search-results-webextension
 */


async function defaults() {
    let isActive = (await browser.storage.local.get('isActive')).isActive
    if (isActive === undefined) {
        isActive = true
        browser.storage.local.set({
            isActive
        })
    }
    
    let currentRange = (await browser.storage.local.get('currentRange')).currentRange
    if (currentRange === undefined) {
        currentRange = 'y'
        browser.storage.local.set({
            currentRange
        })
    }
}
defaults()

async function checkNewUrl(tabId, changeInfo, tabInfo) {
    if (changeInfo.url.indexOf('google.') === -1
    || changeInfo.url.indexOf('/search?') === -1)
        return 

    let isActive = (await browser.storage.local.get('isActive')).isActive
    if (!isActive) return

    let currentRange = (await browser.storage.local.get('currentRange')).currentRange
    if (changeInfo.url[changeInfo.url.indexOf('&tbs=qdr:') + 9] == currentRange)
        return

    let url
    if (changeInfo.url.indexOf('&tbs=qdr:') != -1)
        url = changeInfo.url.replace(/(&tbs=qdr:)(.)/, `$1${currentRange}`)
    else
        url = `${changeInfo.url}&tbs=qdr:${currentRange}`

    browser.tabs.update(tabId, { url })
}
browser.tabs.onUpdated.addListener(checkNewUrl)