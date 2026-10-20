"use strict";

/*
 * BESUCHERZÄHLER-KONFIGURATION
 *
 * Anbieter:
 * https://www.besucherzaehler-kostenlos.de/
 *
 * Du kannst hier die ID, das Design und den Startwert konfigurieren.
 *
 * ID:
 * Trage die ID aus dem von Besucherzähler-Kostenlos.de erzeugten
 * Script-Code ein. Solange COUNTER_ID leer ist, wird der aktuelle
 * Hostname als ID verwendet.
 *
 * DESIGN:
 * "1a" ist das Minimal-Design. Du kannst hier die Designkennung
 * deines eigenen erzeugten Besucherzählers einsetzen.
 *
 * WICHTIG:
 * Diese Datei muss synchron an der gewünschten Ausgabestelle im
 * HTML eingebunden werden, da das Anbieterscript document.write nutzt.
 */

const VISITOR_COUNTER_CONFIG = {
  SCRIPT_URL:
    "https://www.besucherzaehler-kostenlos.de/js/counter.js.php",

  COUNTER_ID: "",

  COUNT: 1,

  START_VALUE: 0,

  DESIGN: "1a"
};

(() => {
  const id =
    VISITOR_COUNTER_CONFIG.COUNTER_ID.trim() ||
    window.location.hostname;

  const parameters = new URLSearchParams({
    count: String(VISITOR_COUNTER_CONFIG.COUNT),
    id: id,
    start: String(VISITOR_COUNTER_CONFIG.START_VALUE),
    design: VISITOR_COUNTER_CONFIG.DESIGN
  });

  const scriptUrl =
    `${VISITOR_COUNTER_CONFIG.SCRIPT_URL}?${parameters.toString()}`;

  /*
   * Das externe Besucherscript gibt seinen Zählerstand selbst aus.
   * Durch document.write wird es an der Position dieses Scripts
   * in das HTML-Dokument eingefügt.
   */

  document.write(
    '<script language="JavaScript" src="' +
      scriptUrl.replace(/&/g, "&amp;") +
      '"><\/script>'
  );
})();
