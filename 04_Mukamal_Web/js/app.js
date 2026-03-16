document.addEventListener('DOMContentLoaded', async () => {
    const reportContainer = document.getElementById('report-content');
    
    try {
        // Fetch the exact markdown file authored by Case Study Factory
        const response = await fetch('./assets/web3_ux_report_2026.md');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const markdown = await response.text();
        
        // Use Marked.js to parse the Markdown directly to HTML
        reportContainer.innerHTML = marked.parse(markdown);
        
    } catch (error) {
        console.error("Failed to load report:", error);
        reportContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <h3 style="color: #ef4444; margin-bottom: 1rem;">System Error</h3>
                <p>Failed to inject the Web3 UX Report payload.</p>
                <p style="font-size: 0.85rem; color: #a1a1aa; margin-top: 1rem;">Terminal: ${error.message}</p>
            </div>
        `;
    }
});
