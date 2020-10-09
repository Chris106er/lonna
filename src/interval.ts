import { applyScope, applyScopeMaybe } from "./applyscope"
import { EventStream, EventStreamSeed } from "."
import { Scope } from "./scope"

export function interval<V>(delay: number, value: V, scope: Scope): EventStream<V>
export function interval<V>(delay: number, value: V): EventStreamSeed<V>
export function interval<V>(delay: number, value: V, scope?: Scope): any {
    return applyScopeMaybe(new EventStreamSeed(`interval(${delay}, ${value})`, (observer) => {
        const interval = setInterval(() => observer(value), delay)
        return () => clearInterval(interval)
    }), scope)
}