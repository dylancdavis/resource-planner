type Key = string | number | symbol

export type Counter = {
    [K in Key]: number
}

export type IDCounter = {
    [K in number]: number
}

/**  Adds `count` of `item` to a counter, adding the key if it does not already exist.
 * Defaults to `1` if `count` is omitted. */
export function addItem(c: Counter, k: Key, count?: number): void {
    if (count === undefined) {
        addItem(c, k, 1)
        return
    }
    if (c.hasOwnProperty(k)) {
        c[k] += count
    } else {
        c[k] = count
    }
}

/**  Removes `count` of `item` from counter, removing the key if the count <= 0 after.
 * Defaults to `1` if `count` is omitted. Does nothing if the key isn't in the counter.  */
export function removeItem(c: Counter, k: Key, count?: number): void {
    if (count === undefined) {
        removeItem(c, k, 1)
        return
    }
    if (c.hasOwnProperty(k)) {
        c[k] -= count
        if (c[k] <= 0) delete c[k]
    }
}

/** Adds all the items from `from` to the counter `to`. Doesn't modify the items in `from`. */
export function copyInto(to: Counter, from: Counter) {
    for (const key in from) {
        addItem(to, key, from[key])
    }
}
