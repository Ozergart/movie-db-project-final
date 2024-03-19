const themeService = {
    getThemeFromLS: (): boolean => {
        return JSON.parse(localStorage.getItem('theme'))
    },
    setThemeToLS: (theme: boolean): void => {
        localStorage.setItem('theme', JSON.stringify(theme))
    }
}
export {
    themeService
}