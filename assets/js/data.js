// ============================================================
// Mock Data - ระบบติดตามคดี
// ============================================================

const MOCK_USER = {
  id: 1, code: 'U001', name: 'นางสาวสุนิตรา ภูวา',
  role: 'นิติกร', dept: 'กลุ่มงานคดี'
};

const STAGES = {
  CASE_GROUP: { code: 'CASE_GROUP', label: 'กลุ่มงานคดี', color: 'badge-casegroup' },
  PREPARE: { code: 'PREPARE', label: 'เตรียมคดี', color: 'badge-prepare' },
  LITIGATION: { code: 'LITIGATION', label: 'งานคดี', color: 'badge-litigation' },
  ENFORCEMENT: { code: 'ENFORCEMENT', label: 'บังคับคดี', color: 'badge-enforce' }
};

const CASE_CATEGORIES = {
  ACCIDENT: 'งานอุบัติเหตุ',
  CONTRACT_MANAGEMENT: 'งานบริหารสัญญา (รถร่วม)',
  LEGAL_CONTRACT: 'นิติกรรมสัญญา',
  ORG_DEFENDANT: 'องค์การถูกฟ้อง'
};

const STATUS_MAP = {
  // ─── กลุ่มงานคดี (CASE_GROUP) — สถานะประตูทาง ──────────────
  CG_RECEIVE:          { label: 'รับเรื่องใหม่',              class: 'status-pending',  stage: 'CASE_GROUP', step: 1, role: 'ธุรการ' },
  CG_IN_PROGRESS:      { label: 'กำลังพิจารณาจัดสรรงาน',     class: 'status-active',   stage: 'CASE_GROUP', step: 2, role: 'หัวหน้างาน' },
  CG_SEND_PREPARE:     { label: 'ส่งเตรียมคดี',               class: 'status-filed',    stage: 'CASE_GROUP', step: 3, role: 'ธุรการ' },
  CG_SEND_LITIGATION:  { label: 'ส่งงานคดีโดยตรง',            class: 'status-filed',    stage: 'CASE_GROUP', step: 3, role: 'ธุรการ' },
  CG_SEND_ENFORCEMENT: { label: 'ส่งบังคับคดีโดยตรง',         class: 'status-filed',    stage: 'CASE_GROUP', step: 3, role: 'ธุรการ' },
  // ─── เตรียมคดี (PREPARE) — Main Statuses (5 ขั้นตอน) ─────
  RECEIVE_DOC:          { label: 'รับเอกสาร / ส่งหัวหน้างาน', class: 'status-pending',  stage: 'PREPARE',      step: 1, role: 'ธุรการ' },
  IN_PROGRESS:          { label: 'นิติกรดำเนินการ',            class: 'status-active',   stage: 'PREPARE',      step: 2, role: 'นิติกร' },
  REVIEW:               { label: 'สอบทาน',                     class: 'status-review',   stage: 'PREPARE',      step: 3, role: 'หัวหน้างาน' },
  SEND_TO_LITIGATION:   { label: 'ส่งงานคดี',                  class: 'status-filed',    stage: 'PREPARE',      step: 4, role: 'ธุรการ' },
  CLOSED:               { label: 'เสร็จสิ้น',                  class: 'status-closed',   stage: 'PREPARE',      step: 5, role: 'ธุรการ' },
  // เตรียมคดี — Sub-Statuses ภายใต้ IN_PROGRESS ─────────────
  WAIT_ASSIGN:          { label: 'รอรับงาน',                   class: 'status-pending',  stage: 'PREPARE',      parent: 'IN_PROGRESS' },
  DEMAND:               { label: 'ทวงถาม',                     class: 'status-review',   stage: 'PREPARE',      parent: 'IN_PROGRESS' },
  REQUEST_NO_LAWSUIT:   { label: 'เสนอขออนุมัติไม่ฟ้อง',       class: 'status-pending',  stage: 'PREPARE',      parent: 'IN_PROGRESS' },
  DONE_PREPARE:         { label: 'เสร็จสิ้น',                  class: 'status-closed',   stage: 'PREPARE',      parent: 'IN_PROGRESS' },
  // ─── งานคดี (LITIGATION) — Main Statuses ─────────────────
  CASE_RECEIVE:         { label: 'รับสำนวน / รอ Assign',       class: 'status-pending',  stage: 'LITIGATION',   step: 1, role: 'ธุรการ' },
  CASE_IN_PROGRESS:     { label: 'นิติกรดำเนินการ',            class: 'status-active',   stage: 'LITIGATION',   step: 2, role: 'นิติกร' },
  CASE_REVIEW:          { label: 'สอบทาน',                     class: 'status-review',   stage: 'LITIGATION',   step: 3, role: 'หัวหน้างาน' },
  SEND_TO_ENFORCE:      { label: 'ส่งงานบังคับคดี',             class: 'status-active',   stage: 'LITIGATION',   step: 4, role: 'ธุรการ' },
  RETURN_TO_PREPARE:    { label: 'ส่งเรื่องคืนงานเตรียมคดี',   class: 'status-returned', stage: 'LITIGATION',   step: 4, role: 'ธุรการ' },
  CASE_CLOSED:          { label: 'เสร็จสิ้น',                  class: 'status-closed',   stage: 'LITIGATION',   step: 5, role: 'ธุรการ' },
  // งานคดี — Sub-Statuses ภายใต้ CASE_IN_PROGRESS ──────────
  CASE_DOC_VERIFY:      { label: 'ตรวจสอบสำนวน',               class: 'status-review',   stage: 'LITIGATION',   parent: 'CASE_IN_PROGRESS' },
  FILE_LAWSUIT:         { label: 'ยื่นฟ้อง',                   class: 'status-filed',    stage: 'LITIGATION',   parent: 'CASE_IN_PROGRESS' },
  PLEA:                 { label: 'ยื่นคำให้การ',                class: 'status-filed',    stage: 'LITIGATION',   parent: 'CASE_IN_PROGRESS' },
  COMPLETE:             { label: 'เสร็จสิ้น',                  class: 'status-closed',   stage: 'LITIGATION',   parent: 'CASE_IN_PROGRESS' },
  // ─── บังคับคดี (ENFORCEMENT) — Main Statuses ─────────────
  ENFORCE_RECEIVE:      { label: 'รับสำนวน / รอ Assign',       class: 'status-pending',  stage: 'ENFORCEMENT',  step: 1, role: 'ธุรการ' },
  ENFORCE_IN_PROGRESS:  { label: 'นิติกรดำเนินการ',            class: 'status-active',   stage: 'ENFORCEMENT',  step: 2, role: 'นิติกร' },
  ENFORCE_REVIEW:       { label: 'สอบทาน',                     class: 'status-review',   stage: 'ENFORCEMENT',  step: 3, role: 'หัวหน้างาน' },
  SEND_BACK_LITIGATION: { label: 'ส่งเรื่องกลับงานคดี',         class: 'status-active',   stage: 'ENFORCEMENT',  step: 4, role: 'ธุรการ' },
  ENFORCE_CLOSED:       { label: 'เสร็จสิ้น',                  class: 'status-closed',   stage: 'ENFORCEMENT',  step: 5, role: 'ธุรการ' },
  // บังคับคดี — Sub-Statuses ภายใต้ ENFORCE_IN_PROGRESS ────
  ENFORCE_DOC_VERIFY:   { label: 'ตรวจสอบเอกสาร',              class: 'status-review',   stage: 'ENFORCEMENT',  parent: 'ENFORCE_IN_PROGRESS' },
  ASSET_INVESTIGATION:  { label: 'สืบทรัพย์',                   class: 'status-pending',  stage: 'ENFORCEMENT',  parent: 'ENFORCE_IN_PROGRESS' },
  ASSET_SEIZURE:        { label: 'ยึดทรัพย์/ขายทอดตลาด',       class: 'status-pending',  stage: 'ENFORCEMENT',  parent: 'ENFORCE_IN_PROGRESS' },
  DEBT_COMPROMISE:      { label: 'ประนอมหนี้',                  class: 'status-filed',    stage: 'ENFORCEMENT',  parent: 'ENFORCE_IN_PROGRESS' },
  BANKRUPTCY_LAWSUIT:   { label: 'ยื่นฟ้องล้มละลาย',            class: 'status-filed',    stage: 'ENFORCEMENT',  parent: 'ENFORCE_IN_PROGRESS' },
  CLAIM_RECEIVE:        { label: 'ยื่นคำขอรับชำระหนี้',         class: 'status-filed',    stage: 'ENFORCEMENT',  parent: 'ENFORCE_IN_PROGRESS' },
  APPROVE_STOP_ENFORCE: { label: 'เสนอขออนุมัติงดบังคับคดี',   class: 'status-pending',  stage: 'ENFORCEMENT',  parent: 'ENFORCE_IN_PROGRESS' },
  ENFORCE_COMPLETE:     { label: 'เสร็จสิ้น',                  class: 'status-closed',   stage: 'ENFORCEMENT',  parent: 'ENFORCE_IN_PROGRESS' }
};

// ─── Workflow Steps per Stage ────────────────────────────────
const STAGE_WORKFLOWS = {
  CASE_GROUP: [
    { code: 'CG_RECEIVE',         label: 'รับเรื่องใหม่ / ส่งหัวหน้างาน',        role: 'ธุรการ' },
    { code: 'CG_IN_PROGRESS',     label: 'พิจารณาจัดสรรงาน',                    role: 'หัวหน้างาน',
      outcomes: [
        { label: 'ส่งเตรียมคดี (flow ปกติ)',         next: 'CG_SEND_PREPARE',     next_stage: 'PREPARE',      next_status: 'RECEIVE_DOC' },
        { label: 'ข้าม → งานคดีโดยตรง',              next: 'CG_SEND_LITIGATION',  next_stage: 'LITIGATION',   next_status: 'CASE_RECEIVE' },
        { label: 'ข้าม → บังคับคดีโดยตรง',           next: 'CG_SEND_ENFORCEMENT', next_stage: 'ENFORCEMENT',  next_status: 'ENFORCE_RECEIVE' }
      ]
    },
    { code: 'CG_SEND_PREPARE',    label: 'ส่งเตรียมคดี',                        role: 'ธุรการ',
      next_stage: 'PREPARE',      next_status: 'RECEIVE_DOC' },
    { code: 'CG_SEND_LITIGATION', label: 'ส่งงานคดีโดยตรง (ข้ามเตรียมคดี)',    role: 'ธุรการ',
      next_stage: 'LITIGATION',   next_status: 'CASE_RECEIVE',
      note: 'กรณีคดีมีเอกสารพร้อมหรือมีคำพิพากษาเดิม ไม่ต้องผ่านเตรียมคดี' },
    { code: 'CG_SEND_ENFORCEMENT',label: 'ส่งบังคับคดีโดยตรง',                 role: 'ธุรการ',
      next_stage: 'ENFORCEMENT',  next_status: 'ENFORCE_RECEIVE',
      note: 'กรณีมีคำพิพากษาถึงที่สุดแล้ว ส่งตรงบังคับคดี' }
  ],
  PREPARE: [
    { code: 'RECEIVE_DOC',        label: 'รับเอกสาร / ส่งหัวหน้างาน', role: 'ธุรการ' },
    { code: 'IN_PROGRESS',        label: 'นิติกรดำเนินการ',            role: 'นิติกร',
      sub: [
        { code: 'WAIT_ASSIGN',         label: 'รอรับงาน' },
        { code: 'DEMAND',              label: 'ทวงถาม' },
        { code: 'REQUEST_NO_LAWSUIT',  label: 'เสนอขออนุมัติไม่ฟ้อง' },
        { code: 'DONE_PREPARE',        label: 'เสร็จสิ้น',
          reasons: ['รับเงิน', 'ส่งฟ้อง กรณีไม่จ่าย', 'จำหน่ายหนี้'] }
      ]
    },
    { code: 'REVIEW',             label: 'สอบทาน',                     role: 'หัวหน้างาน',
      outcomes: [
        { label: 'ปิดเรื่อง',           reasons: ['รับเงิน', 'จำหน่ายหนี้'],   next: 'CLOSED' },
        { label: 'ส่งฟ้องคดี',          next: 'SEND_TO_LITIGATION' },
        { label: 'ตีกลับเพื่อแก้ไข',    next: 'IN_PROGRESS',  note: 'กลับไปที่นิติกร' }
      ]
    },
    { code: 'SEND_TO_LITIGATION', label: 'ส่งงานคดี',                  role: 'ธุรการ',
      note: 'ส่งไปกลุ่มงานคดีเพื่อ Assign',
      next_stage: 'LITIGATION',  next_status: 'CASE_RECEIVE' },
    { code: 'CLOSED',             label: 'เสร็จสิ้น',                  role: 'ธุรการ',
      note: 'กรณีสอบทาน = ปิดเรื่อง' }
  ],
  LITIGATION: [
    { code: 'CASE_RECEIVE',     label: 'รับสำนวน / รอ Assign',         role: 'ธุรการ' },
    { code: 'CASE_IN_PROGRESS', label: 'นิติกรดำเนินการ',              role: 'นิติกร',
      sub: [
        { code: 'CASE_DOC_VERIFY', label: 'ตรวจสอบสำนวน' },
        { code: 'FILE_LAWSUIT',    label: 'ยื่นฟ้อง' },
        { code: 'PLEA',            label: 'ยื่นคำให้การ (จำเลย)' },
        { code: 'COMPLETE',        label: 'เสร็จสิ้น',
          reasons: ['รับเงิน', 'ศาลพิพากษา กรณีไม่จ่าย'] }
      ]
    },
    { code: 'CASE_REVIEW',      label: 'สอบทาน',                       role: 'หัวหน้างาน',
      outcomes: [
        { label: 'ปิดเรื่อง',    next: 'CASE_CLOSED' },
        { label: 'ส่งยึดทรัพย์ / บังคับคดี', next: 'SEND_TO_ENFORCE' }
      ]
    },
    { code: 'SEND_TO_ENFORCE',  label: 'ส่งงานบังคับคดี',              role: 'ธุรการ',
      next_stage: 'ENFORCEMENT', next_status: 'ENFORCE_RECEIVE' },
    { code: 'RETURN_TO_PREPARE',label: 'ส่งเรื่องคืนงานเตรียมคดี',     role: 'ธุรการ', alt: true,
      next_stage: 'PREPARE',     next_status: 'RECEIVE_DOC' },
    { code: 'CASE_CLOSED',      label: 'เสร็จสิ้น',                    role: 'ธุรการ' }
  ],
  ENFORCEMENT: [
    { code: 'ENFORCE_RECEIVE',      label: 'รับสำนวน / รอ Assign',     role: 'ธุรการ' },
    { code: 'ENFORCE_IN_PROGRESS',  label: 'นิติกรดำเนินการ',          role: 'นิติกร',
      sub: [
        { code: 'ENFORCE_DOC_VERIFY',   label: 'ตรวจสอบเอกสาร' },
        { code: 'ASSET_INVESTIGATION',  label: 'สืบทรัพย์' },
        { code: 'ASSET_SEIZURE',        label: 'ยึดทรัพย์/ขายทอดตลาด' },
        { code: 'DEBT_COMPROMISE',      label: 'ประนอมหนี้' },
        { code: 'BANKRUPTCY_LAWSUIT',   label: 'ยื่นฟ้องล้มละลาย' },
        { code: 'CLAIM_RECEIVE',        label: 'ยื่นคำขอรับชำระหนี้' },
        { code: 'APPROVE_STOP_ENFORCE', label: 'เสนอขออนุมัติงดบังคับคดี' },
        { code: 'ENFORCE_COMPLETE',     label: 'เสร็จสิ้น',
          reasons: ['อนุมัติงดบังคับคดีเพื่อยุติเรื่อง', 'รับชำระหนี้'] }
      ]
    },
    { code: 'ENFORCE_REVIEW',       label: 'สอบทาน',                   role: 'หัวหน้างาน',
      outcomes: [
        { label: 'ชำระหนี้ครบ',    next: 'ENFORCE_CLOSED' },
        { label: 'จำหน่ายหนี้',    next: 'ENFORCE_CLOSED' }
      ]
    },
    { code: 'SEND_BACK_LITIGATION', label: 'ส่งเรื่องกลับงานคดี',       role: 'ธุรการ', alt: true,
      next_stage: 'LITIGATION',  next_status: 'CASE_RECEIVE' },
    { code: 'ENFORCE_CLOSED',       label: 'เสร็จสิ้น',                 role: 'ธุรการ' }
  ]
};

const MOCK_CASES = [
  {
    case_id: 1, case_no: 'คดี-68-0001',
    case_title: 'คดีรถร่วมผิดสัญญา นายมนต์ชัย แก้ววัฒถา',
    case_category: 'CONTRACT_MANAGEMENT',
    case_type: 'LITIGATION', current_status: 'FILE_LAWSUIT', main_status: 'CASE_IN_PROGRESS',
    plaintiff: 'องค์การขนส่งมวลชนกรุงเทพ', defendant: 'นายมนต์ชัย แก้ววัฒถา',
    claim_amount: 203088.87, paid_amount: 33170.01, outstanding_amount: 169918.86,
    assignee: 'นางสาวสุนิตรา ภูวา', dept: 'กลุ่มงานคดี',
    open_date: '2025-01-04', legal_case_no: '196/2568',
    contract_no: 'รต.41-005/2553', vehicle_reg_no: '14-7672 กรุงเทพมหานคร',
    last_action: '2026-06-10',
    court: 'ศาลปกครองกลาง'
  },
  {
    case_id: 2, case_no: 'คดี-68-0002',
    case_title: 'คดีอุบัติเหตุ ป้ายหยุดรถสาย 47 แขวงมีนบุรี',
    case_category: 'ACCIDENT',
    case_type: 'PREPARE', current_status: 'DEMAND', main_status: 'IN_PROGRESS',
    plaintiff: 'องค์การขนส่งมวลชนกรุงเทพ', defendant: 'นายสมศักดิ์ วงศ์ทอง',
    claim_amount: 85000, paid_amount: 0, outstanding_amount: 85000,
    assignee: 'นายวิชัย รัตนชัย', dept: 'เตรียมคดี',
    open_date: '2025-03-15', legal_case_no: null,
    contract_no: null, vehicle_reg_no: null,
    last_action: '2026-05-20', court: null
  },
  {
    case_id: 3, case_no: 'คดี-68-0003',
    case_title: 'บังคับคดียึดทรัพย์ นายสุชาติ ประทุมวาน สาย 26',
    case_category: 'CONTRACT_MANAGEMENT',
    case_type: 'ENFORCEMENT', current_status: 'ASSET_INVESTIGATION', main_status: 'ENFORCE_IN_PROGRESS',
    plaintiff: 'องค์การขนส่งมวลชนกรุงเทพ', defendant: 'นายสุชาติ ประทุมวาน',
    claim_amount: 540000, paid_amount: 0, outstanding_amount: 540000,
    assignee: 'นางสาวพรรณี ศรีวิชัย', dept: 'บังคับคดี',
    open_date: '2024-08-01', legal_case_no: '87/2566',
    contract_no: 'รต.26-012/2551', vehicle_reg_no: '2ก-9834 กรุงเทพมหานคร',
    last_action: '2026-06-15', court: 'ศาลแพ่ง'
  },
  {
    case_id: 4, case_no: 'คดี-68-0004',
    case_title: 'คดีองค์การถูกฟ้อง กรณีพนักงานขับรถ สาย 8',
    case_category: 'ORG_DEFENDANT',
    case_type: 'LITIGATION', current_status: 'PLEA', main_status: 'CASE_IN_PROGRESS',
    plaintiff: 'นายอรรถ พลชัย', defendant: 'องค์การขนส่งมวลชนกรุงเทพ',
    claim_amount: 1200000, paid_amount: 0, outstanding_amount: 1200000,
    assignee: 'นายพงษ์ศักดิ์ บุญคุ้ม', dept: 'กลุ่มงานคดี',
    open_date: '2025-06-01', legal_case_no: '312/2568',
    contract_no: null, vehicle_reg_no: '40-8812 กรุงเทพมหานคร',
    last_action: '2026-06-18', court: 'ศาลแพ่ง'
  },
  {
    case_id: 5, case_no: 'คดี-68-0005',
    case_title: 'นิติกรรมสัญญา ซื้อขายที่ดิน โครงการอู่บางเขน',
    case_category: 'LEGAL_CONTRACT',
    case_type: 'PREPARE', current_status: 'WAIT_ASSIGN', main_status: 'IN_PROGRESS',
    plaintiff: 'องค์การขนส่งมวลชนกรุงเทพ', defendant: 'บริษัท พัฒนาที่ดิน จำกัด',
    claim_amount: 32500000, paid_amount: 0, outstanding_amount: 32500000,
    assignee: 'นางสาวอรทัย มงคล', dept: 'เตรียมคดี',
    open_date: '2025-11-20', legal_case_no: null,
    contract_no: null, vehicle_reg_no: null,
    last_action: '2026-06-22', court: null
  },
  {
    case_id: 6, case_no: 'คดี-68-0006',
    case_title: 'บังคับคดีล้มละลาย นายชัยวัฒน์ แสนสุข สาย 54',
    case_category: 'CONTRACT_MANAGEMENT',
    case_type: 'ENFORCEMENT', current_status: 'CLAIM_RECEIVE', main_status: 'ENFORCE_IN_PROGRESS',
    plaintiff: 'องค์การขนส่งมวลชนกรุงเทพ', defendant: 'นายชัยวัฒน์ แสนสุข',
    claim_amount: 890000, paid_amount: 50000, outstanding_amount: 840000,
    assignee: 'นางสาวพรรณี ศรีวิชัย', dept: 'บังคับคดี',
    open_date: '2023-04-10', legal_case_no: 'ลม.123/2565',
    contract_no: 'รต.54-003/2549', vehicle_reg_no: '1ก-4456 กรุงเทพมหานคร',
    last_action: '2026-06-20', court: 'ศาลล้มละลายกลาง'
  },
  // ─── Test Cases: กลุ่มงานคดี (CASE_GROUP) — แสดงการข้าม Stage ────────────
  {
    case_id: 7, case_no: 'คดี-69-0007',
    case_title: 'คดีรถร่วมสาย 8 ค้างชำระ — รอกลุ่มงานคดีจัดสรร',
    case_category: 'CONTRACT_MANAGEMENT',
    case_type: 'CASE_GROUP', current_status: 'CG_RECEIVE', main_status: 'CG_RECEIVE',
    plaintiff: 'องค์การขนส่งมวลชนกรุงเทพ', defendant: 'นายวิทยา โชคดี',
    claim_amount: 120000, paid_amount: 0, outstanding_amount: 120000,
    assignee: 'นางสาวอุไรวรรณ สมบูรณ์', dept: 'กลุ่มงานคดี',
    open_date: '2026-06-28', legal_case_no: 'ตค.รร.2569/0041',
    contract_no: 'รต.08-044/2550', vehicle_reg_no: '14-4521 กรุงเทพมหานคร',
    last_action: '2026-06-28', court: null,
    skip_note: null
  },
  {
    case_id: 8, case_no: 'คดี-69-0008',
    case_title: 'คดีรถร่วมสาย 62 — กลุ่มงานคดีส่งตรงงานคดี (ข้ามเตรียมคดี)',
    case_category: 'CONTRACT_MANAGEMENT',
    case_type: 'CASE_GROUP', current_status: 'CG_SEND_LITIGATION', main_status: 'CG_SEND_LITIGATION',
    plaintiff: 'องค์การขนส่งมวลชนกรุงเทพ', defendant: 'นางสาวพรพิมล เชียงทอง',
    claim_amount: 62000, paid_amount: 0, outstanding_amount: 62000,
    assignee: 'นางสาวอุไรวรรณ สมบูรณ์', dept: 'กลุ่มงานคดี',
    open_date: '2026-06-26', legal_case_no: 'คด.รร.2569/0078',
    contract_no: 'รต.62-078/2554', vehicle_reg_no: '14-8834 กรุงเทพมหานคร',
    last_action: '2026-06-27', court: null,
    skip_note: 'มีเอกสารครบพร้อม — ข้ามเตรียมคดี ส่งงานคดีโดยตรง'
  },
  {
    case_id: 9, case_no: 'คดี-69-0009',
    case_title: 'คดีอุบัติเหตุสาย 191 — กลุ่มงานคดีส่งตรงบังคับคดี (มีคำพิพากษาแล้ว)',
    case_category: 'ACCIDENT',
    case_type: 'CASE_GROUP', current_status: 'CG_SEND_ENFORCEMENT', main_status: 'CG_SEND_ENFORCEMENT',
    plaintiff: 'องค์การขนส่งมวลชนกรุงเทพ', defendant: 'นายมนตรี บ้านสวน',
    claim_amount: 28000, paid_amount: 0, outstanding_amount: 28000,
    assignee: 'นางสาวอุไรวรรณ สมบูรณ์', dept: 'กลุ่มงานคดี',
    open_date: '2026-06-28', legal_case_no: 'ตค.อบ.2569/0025',
    contract_no: null, vehicle_reg_no: '40-5567 กรุงเทพมหานคร',
    last_action: '2026-06-28', court: null,
    skip_note: 'มีคำพิพากษาถึงที่สุดแล้ว — ส่งตรงบังคับคดี ข้ามทั้งเตรียมคดีและงานคดี'
  }
];

const MOCK_REQUESTS = [
  {
    req_id: 1, req_no: 'REQ-68-0021', req_type: 'CONTRACT_MANAGEMENT',
    req_source: 'สำนักปฏิบัติการรถเอกชนร่วมบริการ 1',
    title: 'รถร่วมสาย 40 ผิดสัญญาค้างชำระ 18 งวด',
    req_by: 'นางสาวมณี ทองดี', req_date: '2026-06-20', status: 'SUBMITTED',
    status_label: 'รอพิจารณา', status_class: 'status-review'
  },
  {
    req_id: 2, req_no: 'REQ-68-0022', req_type: 'ACCIDENT',
    req_source: 'เขตการเดินรถที่ 3',
    title: 'อุบัติเหตุรถสาย 77 ชนคนข้ามถนน ถ.พหลโยธิน',
    req_by: 'นายสุรินทร์ ใจดี', req_date: '2026-06-22', status: 'DRAFT',
    status_label: 'ร่าง', status_class: 'status-draft'
  },
  {
    req_id: 3, req_no: 'REQ-68-0023', req_type: 'ORG_DEFENDANT',
    req_source: 'กลุ่มงานนิติกรรม',
    title: 'ถูกฟ้องคดีปกครอง กรณีเปลี่ยนเส้นทางสาย 150',
    req_by: 'นายธนากร บุญช่วย', req_date: '2026-06-23', status: 'UNDER_REVIEW',
    status_label: 'กำลังตรวจสอบ', status_class: 'status-pending'
  },
  {
    req_id: 4, req_no: 'REQ-68-0020', req_type: 'CONTRACT_MANAGEMENT',
    req_source: 'สำนักปฏิบัติการรถเอกชนร่วมบริการ 2',
    title: 'รถร่วมสาย 8 ค้างชำระค่าตอบแทน 24 งวด',
    req_by: 'นางสาวมณี ทองดี', req_date: '2026-06-15', status: 'APPROVED_CREATE_CASE',
    status_label: 'อนุมัติ', status_class: 'status-active'
  },
  {
    req_id: 5, req_no: 'REQ-68-0024', req_type: 'ACCIDENT',
    req_source: 'เขตการเดินรถที่ 1',
    title: 'อุบัติเหตุรถสาย 34 ชนท้ายรถยนต์ส่วนบุคคล ถ.สุขุมวิท',
    req_by: 'นายประสิทธิ์ สายทอง', req_date: '2026-06-24', status: 'SUBMITTED',
    status_label: 'รอพิจารณา', status_class: 'status-review'
  },
  {
    req_id: 6, req_no: 'REQ-68-0025', req_type: 'LEGAL_CONTRACT',
    req_source: 'กลุ่มงานนิติกรรม',
    title: 'ขอทำสัญญาซื้อขายอะไหล่รถโดยสาร ปี 2568',
    req_by: 'นายอนุชา พรมศรี', req_date: '2026-06-25', status: 'SUBMITTED',
    status_label: 'รอพิจารณา', status_class: 'status-review'
  },
  {
    req_id: 7, req_no: 'REQ-68-0019', req_type: 'CONTRACT_MANAGEMENT',
    req_source: 'สำนักปฏิบัติการรถเอกชนร่วมบริการ 1',
    title: 'รถร่วมสาย 62 ผิดนัดชำระหนี้ค่าตอบแทนรายเดือน 12 งวด',
    req_by: 'นางสาวมณี ทองดี', req_date: '2026-06-10', status: 'APPROVED_CREATE_CASE',
    status_label: 'อนุมัติ', status_class: 'status-active'
  },
  {
    req_id: 8, req_no: 'REQ-68-0018', req_type: 'ORG_DEFENDANT',
    req_source: 'เขตการเดินรถที่ 5',
    title: 'พนักงานขับรถสาย 107 ชนรถจักรยานยนต์ ผู้เสียหายยื่นฟ้อง',
    req_by: 'นายวิชัย รัตนชัย', req_date: '2026-06-08', status: 'UNDER_REVIEW',
    status_label: 'กำลังตรวจสอบ', status_class: 'status-pending'
  },
  {
    req_id: 9, req_no: 'REQ-68-0017', req_type: 'CONTRACT_MANAGEMENT',
    req_source: 'สำนักปฏิบัติการรถเอกชนร่วมบริการ 2',
    title: 'รถร่วมสาย 15 ค้างชำระหนี้หลักประกัน ถูกริบแล้ว',
    req_by: 'นายอนุชา พรมศรี', req_date: '2026-06-05', status: 'REJECTED',
    status_label: 'ปฏิเสธ', status_class: 'status-closed'
  },
  {
    req_id: 10, req_no: 'REQ-68-0016', req_type: 'ACCIDENT',
    req_source: 'เขตการเดินรถที่ 7',
    title: 'อุบัติเหตุรถสาย 191 ชนรั้วบ้านเอกชน ย่านบางแค',
    req_by: 'นายสมชาติ แสงทอง', req_date: '2026-06-01', status: 'APPROVED_CREATE_CASE',
    status_label: 'อนุมัติ', status_class: 'status-active'
  },
  {
    req_id: 11, req_no: 'REQ-68-0015', req_type: 'LEGAL_CONTRACT',
    req_source: 'กลุ่มงานนิติกรรม',
    title: 'ต่ออายุสัญญาจ้างเหมาซ่อมบำรุงรถโดยสาร ปี 2568-2569',
    req_by: 'นายธนากร บุญช่วย', req_date: '2026-05-28', status: 'DRAFT',
    status_label: 'ร่าง', status_class: 'status-draft'
  },
  {
    req_id: 12, req_no: 'REQ-68-0014', req_type: 'ORG_DEFENDANT',
    req_source: 'กลุ่มงานคดี',
    title: 'ถูกฟ้องคดีแพ่ง กรณีคู่สัญญารถร่วมเรียกค่าเสียหายสาย 90',
    req_by: 'นายวิรัตน์ สมใจ', req_date: '2026-05-20', status: 'REJECTED',
    status_label: 'ปฏิเสธ', status_class: 'status-closed'
  }
];

const MOCK_TIMELINE = [
  {
    datetime: '2026-06-10 14:30', action: 'ส่งสำนวนยื่นฟ้อง',
    note: 'ยื่นฟ้องต่อศาลปกครองกลาง คดีหมายเลขดำ 196/2568',
    user: 'นางสาวสุนิตรา ภูวา', dot: 'default', dept: 'กลุ่มงานคดี'
  },
  {
    datetime: '2026-05-08 09:15', action: 'ตรวจสอบสำนวนผ่าน',
    note: 'สำนวนครบถ้วน ปรับสถานะเป็น ยื่นฟ้อง',
    user: 'นายวิรัตน์ สมใจ (หัวหน้างาน)', dot: 'success', dept: 'กลุ่มงานคดี'
  },
  {
    datetime: '2026-04-20 10:00', action: 'รับสำนวนจากงานเตรียมคดี',
    note: 'ธุรการรับเอกสารและส่งหัวหน้างาน',
    user: 'นางสาวอุไรวรรณ สมบูรณ์', dot: 'default', dept: 'กลุ่มงานคดี'
  },
  {
    datetime: '2026-04-18 15:45', action: 'งานเตรียมคดีส่งงานคดี',
    note: 'เอกสารครบแล้ว ส่งต่อให้กลุ่มงานคดีดำเนินการฟ้อง',
    user: 'นายวิชัย รัตนชัย', dot: 'default', dept: 'เตรียมคดี'
  },
  {
    datetime: '2025-03-01 11:00', action: 'เปิดคดีในระบบ',
    note: 'สร้างคดีจากคำขอ REQ-68-0001',
    user: 'นางสาวอุไรวรรณ สมบูรณ์', dot: 'success', dept: 'กลุ่มงานคดี'
  }
];

const MOCK_DOCS = [
  { no: 1, name: 'สัญญาให้ประกอบการรถโดยสาร', required: true, uploaded: true, file: 'contract_41005.pdf', date: '2025-01-10' },
  { no: 2, name: 'หนังสือทวงถาม ครั้งที่ 1', required: true, uploaded: true, file: 'demand_1.pdf', date: '2025-02-01' },
  { no: 3, name: 'หนังสือทวงถาม ครั้งที่ 2', required: true, uploaded: true, file: 'demand_2.pdf', date: '2025-03-15' },
  { no: 4, name: 'หนังสือบอกเลิกสัญญา', required: true, uploaded: true, file: 'termination.pdf', date: '2025-04-01' },
  { no: 5, name: 'รายงานยืนยันยอดหนี้จาก สบก.', required: true, uploaded: true, file: 'debt_confirm.pdf', date: '2025-05-20' },
  { no: 6, name: 'ทะเบียนบ้าน/บัตรประชาชนลูกหนี้', required: true, uploaded: true, file: 'id_card.pdf', date: '2025-06-10' },
  { no: 7, name: 'รายงานถอดสรุปยอดหนี้', required: true, uploaded: false, file: null, date: null },
  { no: 8, name: 'หลักฐานการริบหลักประกัน', required: false, uploaded: true, file: 'guarantee_confiscation.pdf', date: '2025-04-05' },
  { no: 9, name: 'เอกสารอื่นๆ', required: false, uploaded: false, file: null, date: null }
];

const MOCK_ACTIVITIES = [
  { id: 1, type: 'ยื่นฟ้อง', date: '2026-06-10', due: null, result: 'ยื่นแล้ว', note: 'ยื่นต่อศาลปกครองกลาง', by: 'นางสาวสุนิตรา ภูวา', done: true },
  { id: 2, type: 'ตรวจสอบสำนวน', date: '2026-05-08', due: null, result: 'ผ่าน', note: 'เอกสารครบถ้วน', by: 'นายวิรัตน์ สมใจ', done: true },
  { id: 3, type: 'ติดตามนัดพิจารณา', date: '2026-07-15', due: '2026-07-15', result: null, note: 'นัดพิจารณาครั้งแรก', by: 'นางสาวสุนิตรา ภูวา', done: false }
];

const MOCK_DASHBOARD_STATS = {
  total_cases: 248,
  active_cases: 163,
  pending_review: 12,
  overdue: 8,
  total_claim: 45820000,
  recovered: 8940000,
  by_stage: { CASE_GROUP: 8, PREPARE: 74, LITIGATION: 102, ENFORCEMENT: 72 },
  by_category: { ACCIDENT: 68, CONTRACT_MANAGEMENT: 112, LEGAL_CONTRACT: 24, ORG_DEFENDANT: 44 },
  by_month: [14, 18, 22, 17, 25, 19, 21, 28, 16, 20, 23, 19]
};

// ─── T_STATUS_LOG — บันทึกประจำสถานะ ──────────────────────────
// แต่ละ log ผูกกับ case_id + stage + status_code
// เก็บเป็น log การดำเนินงาน: ผู้บันทึก, วันที่, หมายเหตุ, ไฟล์แนบ
const MOCK_STATUS_LOGS = [
  // ─── Case 1: คดีรถร่วมผิดสัญญา — Stage: LITIGATION ──────────
  {
    log_id: 1, case_id: 1, stage: 'LITIGATION', status_code: 'CASE_RECEIVE',
    logged_at: '20 เม.ย. 2569 09:15', logged_by: 'นางสาวอุไรวรรณ สมบูรณ์',
    role: 'ธุรการ', dept: 'งานคดี',
    note: 'รับสำนวนจากงานเตรียมคดีเรียบร้อยแล้ว เอกสารครบ 7 รายการ ส่งหัวหน้างานพิจารณา Assign งานให้นิติกร',
    files: [{ name: 'ใบรับสำนวน_คดี-68-0001.pdf', size: '245 KB' }]
  },
  {
    log_id: 2, case_id: 1, stage: 'LITIGATION', status_code: 'CASE_IN_PROGRESS',
    logged_at: '22 เม.ย. 2569 13:30', logged_by: 'นางสาวสุนิตรา ภูวา',
    role: 'นิติกร', dept: 'งานคดี',
    note: 'ตรวจสอบสำนวนเสร็จสิ้น พบว่าเอกสารสัญญาและหนังสือทวงถามครบถ้วน เตรียมยื่นฟ้องต่อศาลปกครองกลาง',
    files: []
  },
  {
    log_id: 3, case_id: 1, stage: 'LITIGATION', status_code: 'CASE_IN_PROGRESS',
    logged_at: '10 มิ.ย. 2569 14:30', logged_by: 'นางสาวสุนิตรา ภูวา',
    role: 'นิติกร', dept: 'งานคดี',
    note: 'ยื่นฟ้องต่อศาลปกครองกลางเรียบร้อยแล้ว คดีหมายเลขดำ 196/2568 กำลังรอศาลนัดพิจารณาครั้งแรก วันที่ 15 ก.ค. 2569',
    files: [
      { name: 'คำฟ้อง_196_2568.pdf', size: '1.2 MB' },
      { name: 'หลักฐานประกอบการฟ้อง.pdf', size: '3.4 MB' }
    ]
  },
  // ─── Case 2: คดีอุบัติเหตุ — Stage: PREPARE ─────────────────
  {
    log_id: 4, case_id: 2, stage: 'PREPARE', status_code: 'RECEIVE_DOC',
    logged_at: '15 มี.ค. 2568 10:00', logged_by: 'นางสาวพรรณิภา จิตร์ดี',
    role: 'ธุรการ', dept: 'เตรียมคดี',
    note: 'รับเอกสารคดีอุบัติเหตุจากเขตการเดินรถที่ 3 เรียบร้อยแล้ว เอกสารเบื้องต้นครบ ส่งหัวหน้างานกำหนดผู้รับผิดชอบ',
    files: [{ name: 'เอกสารส่งเรื่อง_ACC-68.pdf', size: '312 KB' }]
  },
  {
    log_id: 5, case_id: 2, stage: 'PREPARE', status_code: 'IN_PROGRESS',
    logged_at: '20 พ.ค. 2569 11:20', logged_by: 'นายวิชัย รัตนชัย',
    role: 'นิติกร', dept: 'เตรียมคดี',
    note: 'ส่งหนังสือทวงถามนายสมศักดิ์ วงศ์ทอง ให้ชำระหนี้ค่าเสียหาย 85,000 บาท ภายใน 15 วัน รอผลตอบรับ',
    files: [{ name: 'หนังสือทวงถาม_ครั้งที่1.pdf', size: '178 KB' }]
  },
  // ─── Case 3: บังคับคดี — Stage: ENFORCEMENT ─────────────────
  {
    log_id: 6, case_id: 3, stage: 'ENFORCEMENT', status_code: 'ENFORCE_RECEIVE',
    logged_at: '05 ส.ค. 2567 09:00', logged_by: 'นางสาวสุมาลี พงษ์ดี',
    role: 'ธุรการ', dept: 'บังคับคดี',
    note: 'รับสำนวนบังคับคดีจากงานคดีเรียบร้อยแล้ว มีคำพิพากษา ศาลแพ่ง หมายเลข 87/2566 ส่งหัวหน้างาน Assign',
    files: [{ name: 'คำพิพากษา_87_2566.pdf', size: '890 KB' }]
  },
  {
    log_id: 7, case_id: 3, stage: 'ENFORCEMENT', status_code: 'ENFORCE_IN_PROGRESS',
    logged_at: '15 มิ.ย. 2569 10:45', logged_by: 'นางสาวพรรณี ศรีวิชัย',
    role: 'นิติกร', dept: 'บังคับคดี',
    note: 'สืบทรัพย์สินลูกหนี้นายสุชาติ ประทุมวาน — พบที่ดินแปลงหนึ่งใน จ.นนทบุรี และบัญชีธนาคาร 2 แห่ง อยู่ระหว่างขอหมายยึดทรัพย์',
    files: [
      { name: 'รายงานสืบทรัพย์.pdf', size: '456 KB' },
      { name: 'เอกสาร_โฉนดที่ดิน.pdf', size: '1.1 MB' }
    ]
  }
];

// ─── Helpers ──────────────────────────────────────────────────
function fmtDate(d) {
  if (!d) return '-';
  const dt = new Date(d);
  return dt.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' });
}

function fmtMoney(n) {
  if (n == null) return '-';
  return Number(n).toLocaleString('th-TH', { minimumFractionDigits: 2 });
}

function getCategoryLabel(code) {
  return CASE_CATEGORIES[code] || code;
}

function getStatusBadge(statusCode) {
  const st = STATUS_MAP[statusCode] || { label: statusCode, class: 'status-draft' };
  const mainCode = st.parent || statusCode;
  const mainSt = STATUS_MAP[mainCode] || st;
  const subSt = st.parent ? st : null;
  let html = `<span class="status-badge ${mainSt.class}">${mainSt.label}</span>`;
  if (subSt) html += `&thinsp;<span class="status-badge" style="font-size:10px;background:#eaf3fb;color:#1a4480;border:1px solid #b8d3ea;">${subSt.label}</span>`;
  return html;
}

function getStageBadge(stageCode) {
  const s = STAGES[stageCode] || { label: stageCode, color: '' };
  return `<span class="status-badge ${s.color}">${s.label}</span>`;
}
