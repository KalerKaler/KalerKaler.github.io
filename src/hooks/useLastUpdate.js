import { useEffect, useState } from "react";

const CACHE_TIME = 6 * 60 * 60 * 1000; // 6 hours

export default function useLastUpdate(owner, repo) {
    const [date, setDate] = useState(null);

    useEffect(() => {
        if (!owner || !repo) return;
        let cancelled = false;
        const key = `gh-pushed-${owner}/${repo}`;

        // Use the cached date if it's still fresh
        try {
            const cached = JSON.parse(localStorage.getItem(key));
            if (cached && Date.now() - cached.time < CACHE_TIME) {
                setDate(new Date(cached.value));
                return;
            }
        } catch {}

        fetch(`https://api.github.com/repos/${owner}/${repo}`, {
            headers: { Accept: "application/vnd.github+json" },
        })
            .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
            .then(data => {
                if (!data.pushed_at) return;
                localStorage.setItem(key, JSON.stringify({ value: data.pushed_at, time: Date.now() }));
                if (!cancelled) setDate(new Date(data.pushed_at));
            })
            .catch(() => { if (!cancelled) setDate(null); });

        return () => { cancelled = true; };
    }, [owner, repo]);

    return date;
}