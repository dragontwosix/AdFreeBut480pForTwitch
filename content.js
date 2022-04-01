function hookFetch() {
    var realFetch = window.fetch;
    window.fetch = function(url, init, ...args) {
        if (typeof url === 'string') {
            if (url.includes('gql') && init && typeof init.body === 'string' && init.body.includes('PlaybackAccessToken')) {
                const newBody = JSON.parse(init.body);
                newBody.variables.playerType = "thunderdome";
                init.body = JSON.stringify(newBody);
            }
        }
        return realFetch.apply(this, arguments);
    }
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + hookFetch + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);