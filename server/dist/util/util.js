"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorizeResponseTime = void 0;
exports.notificationTemplate = notificationTemplate;
exports.renderHeader = renderHeader;
exports.renderResponseStats = renderResponseStats;
exports.renderWebsiteHealth = renderWebsiteHealth;
exports.renderWebsiteList = renderWebsiteList;
exports.renderFooter = renderFooter;
exports.drawLine = drawLine;
exports.drawTable = drawTable;
exports.drawList = drawList;
const categorizeResponseTime = (responseTime, responseStatus) => {
    if (responseStatus >= 500)
        return "Terjadi kesalahan fatal pada website";
    if (responseTime <= 3000)
        return 'Website dapat diakses dengan cepat.';
    if (responseTime < 5000)
        return 'Website dapat diakses, namun waktu response tinggi.';
    return 'Waktu muat halaman melebihi ambang batas normal.';
};
exports.categorizeResponseTime = categorizeResponseTime;
function notificationTemplate(downWebsites) {
    const now = new Date().toLocaleString("id-ID");
    const header = `<b>🚨 Peringatan: Website Bermasalah</b>\n`;
    const timestamp = `<i>Terdeteksi pada: ${now}</i>\n\n`;
    const list = downWebsites.map((w, i) => `<b>${i + 1}. ${w.name}</b>\n${w.url}\n`).join("\n");
    const footer = `\n⚠️ Mohon segera periksa website yang terdaftar di atas.\n\n#KuninganSiteWell #MonitoringWebsite #WebsiteDown`;
    return `${header}${timestamp}${list}${footer}`;
}
function renderHeader(pdf) {
    pdf.fontSize(20).font("Helvetica-Bold").text("LAPORAN MONITORING WEBSITE", { align: "center" });
    pdf.moveDown(0.5);
    pdf.fontSize(10).font("Helvetica-Oblique").fillColor("gray")
        .text(`Dibuat pada: ${new Date().toLocaleString("id-ID")}`, { align: "center" });
    pdf.moveDown();
    drawLine(pdf);
    pdf.moveDown(1.5);
}
function renderResponseStats(pdf, stats) {
    pdf.fontSize(14).font("Helvetica-Bold").fillColor("black").text("Statistik Waktu Respon");
    pdf.moveDown(0.3);
    pdf.fontSize(11).font("Helvetica");
    drawTable(pdf, [
        ["Kategori", "Jumlah", "Rata-rata (ms)"],
        ["Baik", stats.good.count, stats.good.average],
        ["Cukup", stats.fair.count, stats.fair.average],
        ["Buruk", stats.poor.count, stats.poor.average],
    ]);
    pdf.moveDown(1.5);
}
function renderWebsiteHealth(pdf, healthy) {
    pdf.fontSize(14).font("Helvetica-Bold").text("Kondisi Website Secara Umum");
    pdf.moveDown(0.3);
    pdf.fontSize(11).font("Helvetica");
    pdf.text(`Website Sehat: ${healthy.healthy_websites.total} (${healthy.healthy_websites.percent}%)`);
    pdf.text(`Website Down: ${healthy.down_websites.total} (${healthy.down_websites.percent}%)`);
    pdf.text(`Total Website: ${healthy.total_website}`);
    pdf.moveDown(1.5);
}
function renderWebsiteList(pdf, title, list, key, suffix) {
    pdf.fontSize(14).font("Helvetica-Bold").text(title);
    pdf.moveDown(0.3);
    pdf.fontSize(11).font("Helvetica");
    if (list.length === 0) {
        pdf.text(title === "Website yang Sedang Down" ? "Semua website dalam kondisi baik" : "Tidak ada data.");
        pdf.moveDown(1.5);
        return;
    }
    list.forEach((item, index) => {
        pdf.text(`${index + 1}. ${item.name}${suffix}`, { indent: 20 });
    });
    pdf.moveDown(1.5);
}
function renderFooter(pdf) {
    pdf.moveDown(2);
    pdf.fontSize(10).fillColor("gray")
        .text("Laporan ini dibuat secara otomatis oleh Sistem Monitoring Website © 2025", { align: "center" });
}
function drawLine(pdf) {
    pdf.moveTo(40, pdf.y).lineTo(550, pdf.y).stroke("#999");
}
function drawTable(pdf, rows) {
    const startX = 60;
    let y = pdf.y + 5;
    const columnWidths = [180, 120, 120];
    const rowHeight = 20;
    pdf.font("Helvetica-Bold");
    rows.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const x = startX + columnWidths.slice(0, colIndex).reduce((a, b) => a + b, 0);
            pdf.text(String(cell), x, y, { width: columnWidths[colIndex], align: "left" });
        });
        y += rowHeight;
        pdf.moveTo(startX, y - 5).lineTo(startX + 420, y - 5).stroke("#ccc");
        if (rowIndex === 0)
            pdf.font("Helvetica");
    });
}
function drawList(pdf, list, key, suffix) {
    pdf.font("Helvetica");
    if (list.length === 0) {
        pdf.text("Tidak ada data.");
        return;
    }
    list.forEach((item, index) => {
        pdf.text(`${index + 1}. ${item.name} — ${item[key]}${suffix}`, {
            indent: 20,
        });
    });
}
//# sourceMappingURL=util.js.map