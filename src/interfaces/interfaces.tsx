export interface ItemType {
  type: string;
  title: string;
  position: number;
}

export interface CardProps {
  id: any;
  title: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  type: string;
  onSelectImage: (url: string) => void;
}

export interface DragItem {
  index: number;
  id: string;
  type: string;
}
