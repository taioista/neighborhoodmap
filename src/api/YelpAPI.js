const api = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses"

const headers = {
    "Authorization" : "Bearer MAJkcXT91-2cLhjPfTCBqmDTioWo-HmVEoNeYMyOUPSKD-ysm4rz-1SzZL02jfjTAVW04BQO54JL3VqduarLl4xhHanS-HyeO9mXMqi8PjrrFR4dmUvX8T0OXc_tXHYx"
}

export const get = (placeId) =>
  fetch(`${api}/${placeId}`, { headers })
    .then(res => res.json())