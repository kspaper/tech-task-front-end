export function checkStatus(response) {
    if (!response.ok) {
        const error = new Error(response.statusText || response.status);
        error.response = response;
        throw error;
    }
    return response;
}

export function parseJSON(response) {
    return response.json();
}

export default function callAPI(url, onRequestSuccess, onRequestFailure) {
    fetch(url)
        .then(checkStatus)
        .catch(
            (error) => {
                throw error;
            })
        .then(parseJSON)
        .then((json) => {
            onRequestSuccess(json);
        }).catch((error) => {
            const response = error.response;
            if (response === undefined) {
                onRequestFailure(error);
            } else {
                error.status = response.status;
                error.statusText = response.statusText;
                response.text().then((text) => {
                    try {
                        const json = JSON.parse(text);
                        error.message = json.message;
                    } catch (ex) {
                        error.message = text;
                    }
                    onRequestFailure(error);
                });
            }
        });
}
