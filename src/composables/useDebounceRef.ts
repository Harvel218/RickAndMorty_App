import { ref, customRef } from 'vue';

const debounce = (fn: any, delay = 0, immediate = false) => {
    let timeout: number;
    return (...args: any) => {
        if (immediate && !timeout) fn(...args);
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

const useDebouncedRef = (initialValue: string, delay: number, immediate: boolean) => {
    const state = ref(initialValue);
    const debouncedRef = customRef((track, trigger) => ({
        get() {
            track();
            return state.value;
        },
        set: debounce(
            (value: any) => {
                state.value = value;
                localStorage.setItem('userData', JSON.stringify(state.value));
                trigger();
            },
            delay,
            immediate
        ),
    }));
    return debouncedRef;
};

export default useDebouncedRef;
