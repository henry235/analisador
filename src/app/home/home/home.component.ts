import { Component } from '@angular/core';

interface Palavra {
  text: string;
  count: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  textoEntrada: string = ''; // Texto inserido pelo usuário
  totalPalavras: number = 0; // Total de palavras no texto
  totalPalavrasUnicas: number = 0; // Total de palavras únicas no texto
  quantidadeCaracteres: number = 0; // Total de caracteres no texto
  palavrasPorMinuto: number = 200; // Palavras por minuto para cálculo do tempo de leitura
  top10Palavras: Palavra[] = []; // Lista das 10 palavras mais comuns no texto

  contarPalavras(): void {
    if (!this.textoEntrada.trim()) {
      // Se o texto de entrada estiver vazio, define todas as variáveis como zero
      this.totalPalavras = 0;
      this.totalPalavrasUnicas = 0;
      this.quantidadeCaracteres = 0;
      this.top10Palavras = [];
      return;
    }

    // Conta as palavras no texto
    let palavras = this.textoEntrada.trim().split(/\s+/);
    this.totalPalavras = palavras.length;

    // Conta as palavras únicas no texto
    let palavrasUnicas = new Set(palavras);
    this.totalPalavrasUnicas = palavrasUnicas.size;

    // Calcula a quantidade de caracteres no texto
    this.quantidadeCaracteres = this.textoEntrada.length;

    // Calcula as 10 palavras mais comuns no texto
    this.calcularTop10Palavras(palavras);
  }

  calcularTempoLeitura(): number {
    // Calcula o tempo de leitura estimado em minutos com base nas palavras por minuto
    return Math.ceil(this.totalPalavras / this.palavrasPorMinuto);
  }

  calcularTop10Palavras(palavras: string[]): void {
    // Conta a ocorrência de cada palavra
    let contagemPalavras: { [palavra: string]: number } = {};
    for (let palavra of palavras) {
      contagemPalavras[palavra] = (contagemPalavras[palavra] || 0) + 1;
    }

    // Converte as contagens de palavras em um array de objetos
    let palavrasContadas: Palavra[] = [];
    for (let palavra in contagemPalavras) {
      palavrasContadas.push({ text: palavra, count: contagemPalavras[palavra] });
    }

    // Ordena o array de objetos pela contagem de palavras em ordem decrescente
    this.top10Palavras = palavrasContadas.sort((a, b) => b.count - a.count).slice(0, 10);
  }
}
