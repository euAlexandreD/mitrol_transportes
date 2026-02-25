async function gerarPDF() {
  const { jsPDF } = window.jspdf;

  const tabela = document.querySelector(".tabela_de_cidades");
  const logo = document.getElementById("logoEmpresa");

  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const margin = 15;
  const colunas = 5;
  const larguraColuna = (pageWidth - margin * 2) / colunas;
  const alturaLinha = 9;

  const cidades = [...tabela.querySelectorAll("td")].map((td) => td.innerText);

  let y = 0;
  let linhaAtual = 0;

  function adicionarCabecalho() {
    y = margin;

    // Marca d'água
    pdf.setGState(new pdf.GState({ opacity: 0.05 }));
    pdf.addImage(
      logo.src,
      "PNG",
      pageWidth / 2 - 40,
      pageHeight / 2 - 40,
      80,
      40,
    );
    pdf.setGState(new pdf.GState({ opacity: 1 }));

    // Logo topo
    pdf.addImage(logo.src, "PNG", pageWidth / 2 - 8, y, 22, 22);
    y += 22;

    // Nome empresa
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(31, 60, 136);
    pdf.text("MITROL TRANSPORTES", pageWidth / 2, y, { align: "center" });
    y += 6;

    // Linha institucional
    pdf.setDrawColor(31, 60, 136);
    pdf.setLineWidth(0.8);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 8;

    // Título
    pdf.setFontSize(12);
    pdf.setTextColor(0);
    pdf.text("Lista de Cidades Atendidas", pageWidth / 2, y, {
      align: "center",
    });
    y += 6;

    pdf.setFontSize(9);
    pdf.setTextColor(100);
    pdf.text(
      "Documento gerado em " + new Date().toLocaleDateString("pt-BR"),
      pageWidth / 2,
      y,
      { align: "center" },
    );

    y += 10;
  }

  adicionarCabecalho();

  pdf.setFontSize(8);
  pdf.setTextColor(0);

  cidades.forEach((cidade, index) => {
    const colunaIndex = index % colunas;
    if (colunaIndex === 0 && index !== 0) {
      linhaAtual++;
    }

    const posX = margin + colunaIndex * larguraColuna;
    const posY = y + linhaAtual * alturaLinha;

    // Nova página se necessário
    if (posY + alturaLinha > pageHeight - 20) {
      pdf.addPage();
      linhaAtual = 0;
      adicionarCabecalho();
    }

    const yFinal = y + linhaAtual * alturaLinha;

    // Sombreamento alternado
    if (linhaAtual % 2 === 0) {
      pdf.setFillColor(245, 245, 245);
      pdf.rect(posX, yFinal, larguraColuna, alturaLinha, "F");
    }

    pdf.rect(posX, yFinal, larguraColuna, alturaLinha);
    pdf.text(cidade, posX + larguraColuna / 2, yFinal + 6, { align: "center" });
  });

  // Rodapé + Numeração
  const totalPages = pdf.internal.getNumberOfPages();

  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);

    pdf.setFontSize(8);
    pdf.setTextColor(120);

    pdf.text(
      "MITROL TRANSPORTES • Transporte e Logística",
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" },
    );

    pdf.text(
      `Página ${i} de ${totalPages}`,
      pageWidth - margin,
      pageHeight - 10,
      { align: "right" },
    );
  }

  pdf.save("MITROL-Lista-de-Cidades-Oficial.pdf");
}
