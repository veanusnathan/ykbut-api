interface Summary {
  full: string;
  available_part: string;
  available: string;
  no_ar: string;
  ar: string;
  no_transaction: string;
}

interface MappingArea {
  area: string;
  lat: string;
  long: string;
  full: string;
  available_part: string;
  available: string;
  no_ar: string;
  ar: string;
  no_transaction: string;
}

interface Nusantara {
  summary: Summary[];
  mapping: MappingArea[];
}

interface Graduate {
  target: string;
  achievment: string;
  total_graduate: string;
}

interface Student {
  reguler: string;
  non_reguler: string;
  total_student: string;
}

interface Sales {
  target: string;
  achivement: string;
  achivement_ar: string;
  top_customer: string;
}

interface Perform {
  nusantara: Nusantara[];
  graduate: Graduate[];
  student: Student[];
  sales: Sales[];
}

interface Level0 {
  perform: Perform[];
}

export interface Response {
  level0: Level0[];
}
