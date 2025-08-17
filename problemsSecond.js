import { problems, resourcesByProblem } from './dataSecond.js';

  
  // 一覧を描画
  const root = document.getElementById("problems");
  const frag = document.createDocumentFragment();
  
  problems.forEach(p => {
    const div = document.createElement("div");
    div.className = "problem-detail";
    div.dataset.no = String(p.no);
    div.innerHTML = `<p>${p.text}</p>`;
    frag.appendChild(div);
  });
  root.appendChild(frag);
  
  // モーダル要素
  const modal = document.getElementById("modal");
  const modalTitleNo = document.getElementById("modal-problem-no");
  const modalLinks = modal.querySelector(".modal__links");
  
  // カードクリックでモーダル表示（イベント委譲）
  root.addEventListener("click", (e) => {
    const card = e.target.closest(".problem-detail");
    if (!card) return;
  
    const no = Number(card.dataset.no);
    const res = resourcesByProblem[no];
    if (!res) { alert(`問題 ${no} のリンクが未設定です`); return; }
  
    modalTitleNo.textContent = no;
    modalLinks.innerHTML = "";
  
    const items = [
      { label: "例題解説（YouTube）", url: res.example },
      { label: "演習問題解説（YouTube）", url: res.drill },
      { label: "復習問題（Google Drive）", url: res.reviewPdf },
      { label: "復習問題解説（YouTube）", url: res.review },
    ];
  
    for (const it of items) {
      const li = document.createElement("div");
      li.className = "link-item";
      li.innerHTML = `<a href="${it.url}" target="_blank" rel="noopener noreferrer">${it.label}<small>新しいタブで開く</small></a>`;
      modalLinks.appendChild(li);
    }
  
    openModal();
  });
  
  // モーダル開閉
  function openModal() {
    modal.setAttribute("aria-hidden", "false");
    modal.querySelector(".modal__close").focus();
  }
  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
  }
  
  // オーバーレイ/×クリックで閉じる
  modal.addEventListener("click", (e) => {
    if (e.target.dataset.close === "true") closeModal();
  });
  
  // Escキーで閉じる
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
  