interface Summary {
  full: string;
  available_part: string;
  available: string;
  no_ar: string;
  ar: string;
  no_transaction: string;
}

export interface Mapping {
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
  mapping: Mapping[];
}

interface Perform {
  nusantara: Nusantara[];
  graduate: Graduate[];
  student: Student[];
  sales: Sales[];
}

export interface Graduate {
  target: string;
  achievment: string;
  total_graduate: string;
}

export interface Student {
  reguler: string;
  non_reguler: string;
  total_student: string;
}

export interface Sales {
  target: string;
  achievment: string;
  achievment_ar: string;
  top_customer: string;
}

export interface Level0 {
  perform: Perform[];
}

interface Demand {
  customer: string;
  project: string;
}

interface Project {
  project: string;
  amount: string;
  customer: string;
  ratio: string;
  win_ratio: string;
}

interface Quotation {
  expired: string;
  close: string;
  done: string;
  cancel: string;
  amount_expired: string;
  amount_close: string;
  amount_done: string;
  amount_cancel: string;
  total: string;
}

interface Pre {
  demand: Demand[];
  project: Project[];
  quotation: Quotation[];
}

interface Data {
  sponsor_fee: string;
  training_fee: string;
  konsultasi: string;
  total_po: string;
}

interface Po {
  project: Data[];
}

interface Pembayaran {
  cash_payment: string;
  payment1: string;
  payment2: string;
  payment3: string;
  payment4: string;
  payment5: string;
}

interface EventStatus {
  paid: string;
  unpaid: string;
}

interface Event {
  event: string;
  event_amount: string;
  event_status: EventStatus[];
}

interface KiplExecution {
  po: Po[];
  pembayaran: Pembayaran[];
  event: Event[];
}

interface SalesPerformence {
  target: string;
  achievment: string;
  amount: string;
  ar: string;
  top_customer: string;
}

interface CustCoverage {
  ahemce: string;
  non_ahemce: string;
  new_customer_target: string;
  new_customer_area: string;
}

interface KiplOutput {
  sales_performence: SalesPerformence[];
  cust_coverage: CustCoverage[];
  non_reguler_student: { student: string }[];
  alumni: { serapan: string }[];
}

export interface Kipl {
  pre: Pre[];
  execution: KiplExecution[];
  output: KiplOutput[];
}

interface RencanaPembelajaran {
  classroom: string;
  student: string;
}

interface Siswa {
  reguler: string;
  non_reguler: string;
  total: string;
}

interface Bintalsik {
  batch: string;
  classroom: string;
  total: string;
}

interface KalendarAkademik {
  bintalsik: Bintalsik[];
  in_class: Bintalsik[];
  ojt: Bintalsik[];
  lulus: Bintalsik[];
}

interface Execution {
  siswa: Siswa[];
  kalendar_akademik: KalendarAkademik[];
}

interface GrafikAlumni {
  year: string;
  month: string;
  alumni: string;
}

interface JumlahAlumni {
  total: string;
  non_reguler: string;
  reguler: string;
  csr: string;
}

interface Output {
  jumlah_alumni: JumlahAlumni[];
  grafik_alumni: GrafikAlumni[];
  presentase: string;
}

export interface Akademik {
  pre: { rencana_pembelajaran: RencanaPembelajaran[] }[];
  execution: Execution[];
  output: Output[];
}

export interface RootObject {
  level0: Level0[];
  kipl: Kipl[];
  akademik: Akademik[];
}
