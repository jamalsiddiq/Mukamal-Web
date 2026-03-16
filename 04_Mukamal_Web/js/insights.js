// Load Insights from JSON
document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById('insights-grid');
    if (!grid) return;

    try {
        const response = await fetch('/data/insights.json');
        const insights = await response.json();
        
        let html = '';
        insights.forEach(insight => {
            html += `
                <a href="${insight.url}" class="work-card">
                    <div class="work-image card">
                        <div style="background: var(--dim); width:100%; height:100%; display:flex; align-items:center; justify-content:center; color: var(--bg); font-family:var(--font-d);">INSIGHT: ${insight.category}</div>
                    </div>
                    <div class="work-meta" style="margin-top: 20px; display: flex; justify-content: space-between; font-family: var(--font-m); font-size: 12px; color: var(--accent);">
                        <span>${insight.date}</span>
                        <span>${insight.readTime}</span>
                    </div>
                    <h3 class="h4" style="margin: 10px 0;">${insight.title}</h3>
                    <p class="body-sm" style="color: var(--dim);">${insight.excerpt}</p>
                </a>
            `;
        });
        
        grid.innerHTML = html;
        
        // Refresh ScrollTrigger after DOM injection
        if (typeof ScrollTrigger !== 'undefined') {
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);
        }

    } catch (e) {
        console.error("Error loading insights:", e);
        grid.innerHTML = '<p style="color:red">Failed to load content feed.</p>';
    }
});
