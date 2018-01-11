/**
 * Only Recent Search Results
 **
 * @author      Michele Federici (@ps1dr3x) <michele@federici.tech>
 * @license     MIT
 * @source      https://github.com/ps1dr3x/only-recent-search-results-webextension
 */


async function main() {
    let isActive = (await browser.storage.local.get('isActive')).isActive
    if (isActive === undefined) {
        isActive = true;
        browser.storage.local.set({
            isActive
        })
    }

    if (isActive
    && location.href.indexOf('google.') !== -1
    && location.href.indexOf('&tbs=') === -1)
        document.querySelector('#qdr_y a').click()
}
main();