const stripHtml = function stripHtml(html) {
    // remove HTML tags
    const stripped = html.replace(/<\/?[^>]+(>|$)/g, "");
    // remove extra spaces and trim the result
    return stripped.replace(/\s+/g, ' ').trim();
}

export default stripHtml;
