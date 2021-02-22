const puppeteer = require("puppeteer");
const fs = require("fs");
const {
  generateCepAleatory,
  gerarEmail,
  gerarTelefone,
  clientes,
  enderecos,
} = require("./functions");

(async () => {
  const arrayOfItens = [];
  for (let i = 0; i < clientes.length; i++) {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--start-fullscreen"],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 976 });
    await page.goto("https://www.lojadomecanico.com.br/");
    const navigationPromise = page.waitForNavigation({
      waitUntil: "domcontentloaded",
    });

    const info = await page.evaluate(() => {
      const nodeList = document.getElementsByClassName(
        "col-sm-12 col-xs-12 colzero"
      )[0];
      const firstItemPage =
        nodeList.firstElementChild.firstElementChild.firstElementChild
          .children[1];
      return firstItemPage.href;
    });

    //clickar no primeiro produto da lista
    await page.waitForSelector(`[href="${info}"]`);
    await page.click(`[href="${info}"]`);
    await page.waitForTimeout(3000).then(() => console.log("WAITED"));

    //esperar botão para adicionar mais um na quantidade
    await page.waitForSelector(`.btn-plus-comprar`);
    await page.waitForTimeout(2000);
    await page.click(`.btn-plus-comprar`);

    //clickar no botao comprar
    await page.waitForSelector(`[id="btn-comprar-product"]`);
    await page.waitForTimeout(2000);
    await page.click(`[id="btn-comprar-product"]`);

    //esperar ele ser adicionado ao carrinho
    await page.waitForTimeout(3000).then(() => console.log("WAITED"));

    //qndo aparecer um botao com hover clickar neste botao
    await page.waitForSelector(
      '[href="https://www.lojadomecanico.com.br/carrinho"]'
    );
    await page.click('[href="https://www.lojadomecanico.com.br/carrinho"]');
    //ai ele é direcionado para a pagina

    await navigationPromise;

    await page.waitForSelector(
      `[href="https://www.lojadomecanico.com.br/checkout/selecionar-endereco"]`
    );
    await navigationPromise;
    await page.waitForTimeout(2000);
    await page.click(
      `[href="https://www.lojadomecanico.com.br/checkout/selecionar-endereco"]`
    );
    await navigationPromise;
    await page.waitForTimeout(2000);

    await page.waitForSelector(
      `[href="https://www.lojadomecanico.com.br/tipo-pessoa"]`
    );
    await navigationPromise;
    await page.waitForTimeout(2000);

    await page.click(`[href="https://www.lojadomecanico.com.br/tipo-pessoa"]`);
    await navigationPromise;
    await page.waitForSelector(
      `[href="https://www.lojadomecanico.com.br/cadastro/f"]`
    );
    await navigationPromise;
    await page.click(`[href="https://www.lojadomecanico.com.br/cadastro/f"]`);
    await navigationPromise;
    await page.waitFor(`input[name="nome"]`);
    await page.type(`input[name="nome"]`, `${clientes[i].nome}`, { delay: 30 });

    await page.waitFor(`input[name="email"]`);
    await page.type(`input[name="email"]`, `${gerarEmail()[i]}`, {
      delay: 30,
    });
    //await page.type(`input[name="email"]`, `${gerarEmail()[i]}`);

    await page.waitFor(`input[name="telefone"]`);
    await page.type(`input[name="telefone"]`, `${gerarTelefone()}`, {
      delay: 30,
    });

    await page.waitFor(`input[name="password"]`);
    await page.type(`input[name="password"]`, `${clientes[i].senha}`, {
      delay: 30,
    });

    await page.click('button.btn-create[type="submit"]');

    await page
      .waitForTimeout(3000)
      .then(() => console.log("Esperando ver se email já existe"));

    const emailJaExiste = await page.evaluate(() => {
      const errorMsg = document.querySelector("#email-error");
      return errorMsg;
    });

    if (emailJaExiste) {
      await browser.close();
      if (emailJaExiste.textContent) {
        if (emailJaExiste.textContent.includes("login")) {
          continue;
        }
      }
    }
    if (!emailJaExiste) {
      await page.waitForSelector('input[name="cep"]');
      await page.type('input[name="cep"]', `${generateCepAleatory()}`, {
        delay: 30,
      });

      await page.waitForTimeout(3000).then(() => console.log("WAITED"));
      await page.click('[class="container-input-check"]');

      await page.waitForSelector(
        "#form-new-address-pf > div:nth-child(3) > div:nth-child(10) > div.mat-div.col-sm-12.col-xs-12.is-completed > label",
        "19981317613"
      );
      await page.type(
        "#form-new-address-pf > div:nth-child(3) > div:nth-child(10) > div.mat-div.col-sm-12.col-xs-12.is-completed > label",
        "19981317613"
      );

      await page.waitForTimeout(3000).then(() => console.log("WAITED"));
      await page.click(
        "#checkout > div.col-xs-12.col-sm-7.col-md-7.col-lg-8.section-left.padmobile.top20 > div.col-sm-6.col-sm-offset-6.col-xs-12.text-right.link.col-xs-12.pad-sm-md-lg.top20.hidden-xs > button"
      );
      await navigationPromise;

      await page.waitForTimeout(3000).then(() => console.log("WAITED"));
      await page.click(
        "#checkout > div.col-xs-12.col-sm-7.col-md-7.col-lg-8.section-left.top20.margin-bottom-480 > div.same-day.col-sm-5.col-sm-offset-7.col-xs-12.text-right.link.col-xs-12.colzero.top20.showIfBar > a > button"
      );
      await navigationPromise;

      await page.waitForTimeout(3000).then(() => console.log("WAITED"));
      await page.click(
        "#box-type-payments > div.meios-sugeridos > div.col-xs-12.padBoleto.padmobile.colzero > div"
      );
      await navigationPromise;
      await page.waitForTimeout(2000);
      await page.waitForSelector('[id="cpfnota"]');
      await page.type('[id="cpfnota"]', `${clientes[i].cpf}`, { delay: 35 });

      await navigationPromise;
      await page.waitForTimeout(2000).then(() => console.log("WAITED"));
      await page.click(
        "#checkout > div.col-xs-12.col-sm-7.col-md-7.col-lg-8.section-left.top20.padmobile > div.col-sm-6.col-sm-offset-6.col-xs-12.text-right.link.col-xs-12.pad-sm-md-lg.top30.hidden-xs > button"
      );
      await navigationPromise;
      await page.waitForTimeout(2000).then(() => console.log("WAITED"));
      await page.click(
        "#form-save-order > button.rippleContainer.col-sm-12.btn.btn-buscar-pedido.text-uppercase.strong600.botaoFinalizarBoleto.hidden-xs"
      );
      await navigationPromise;
      await page.waitForTimeout(2000).then(() => console.log("WAITED"));
      await page.waitForSelector(
        "#novoPagamento > div.col-md-offset-2.col-lg-7.col-md-8.col-sm-10 > div:nth-child(2) > div.col-lg-12.col-md-12.col-sm-12 p#lindig"
      );
      await navigationPromise;
      await page.waitForTimeout(2000).then(() => console.log("WAITED"));
      const boletoDescription = await page.evaluate(() => {
        const innerHTMLtext = document.querySelector(
          "#novoPagamento > div.col-md-offset-2.col-lg-7.col-md-8.col-sm-10 > div:nth-child(2) > div.col-lg-12.col-md-12.col-sm-12 p#lindig"
        );

        return innerHTMLtext.textContent;
      });

      const user = {
        boletoID: boletoDescription,
        nome: clientes[i].nome,
        cpf: clientes[i].cpf,
        email: gerarEmail()[i],
        senha: clientes[i].senha,
        cep:generateCepAleatory(),
      };
      arrayOfItens[i] = user;

      fs.writeFileSync(
        "dados.json",
        JSON.stringify(arrayOfItens, null, 2),
        (err) => {
          if (err) throw new Error("Algo deu errado");
          console.log("Usuario cadastrado");
        }
      );
      await browser.close();
    }
  }
})();
