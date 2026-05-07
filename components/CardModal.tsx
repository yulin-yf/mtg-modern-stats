'use client';

import { useState, useEffect } from 'react';

interface CardData {
  name: string;
  nameCN?: string;
  imageUrl?: string;
  manaCost?: string;
  type?: string;
  text?: string;
  power?: string;
  toughness?: string;
  price?: number;
}

interface CardModalProps {
  cardName: string;
  onClose: () => void;
}

export default function CardModal({ cardName, onClose }: CardModalProps) {
  const [card, setCard] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}`)
      .then((r) => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then((d) => {
        setCard({
          name: d.name,
          imageUrl: d.image_uris?.normal || d.image_uris?.small,
          manaCost: d.mana_cost,
          type: d.type_line,
          text: d.oracle_text,
          power: d.power,
          toughness: d.toughness,
          price: d.prices?.usd ? parseFloat(d.prices.usd) : undefined,
        });
        setLoading(false);
      })
      .catch(() => {
        setCard({ name: cardName });
        setLoading(false);
      });
  }, [cardName]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800/60">
          <h3 className="font-bold text-gray-100">{card?.name || cardName}</h3>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          {loading ? (
            <div className="h-40 skeleton-bar rounded-lg" />
          ) : card?.imageUrl ? (
            <div className="flex gap-4">
              <img
                src={card.imageUrl}
                alt={card.name}
                className="w-40 rounded-lg shadow-lg flex-shrink-0"
              />
              <div className="space-y-2 flex-1 min-w-0">
                {card.manaCost && (
                  <div className="text-sm text-mtg-gold font-mono">{card.manaCost}</div>
                )}
                {card.type && (
                  <div className="text-sm text-gray-400">{card.type}</div>
                )}
                {card.text && (
                  <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{card.text}</div>
                )}
                {card.power && (
                  <div className="text-sm text-gray-400">{card.power}/{card.toughness}</div>
                )}
                {card.price && (
                  <div className="text-sm text-mtg-gold font-bold mt-2">${card.price.toFixed(2)}</div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-center py-8">
              Card image not available / 卡牌图片不可用
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
