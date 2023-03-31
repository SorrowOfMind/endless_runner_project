let tool = {
    qs: (elem: string) => document.querySelector(elem),
    id: (elem: string) => document.getElementById(elem),
    arr: (elem: string) => [...document.querySelectorAll(elem)],
}

export default tool;