
// Mock MongoDB data service for browser use
// In a real application, this would be an API call to your backend

// Sample lead data structure based on your MongoDB schema
interface Lead {
  id: number;
  name: string;
  price: number;
  responsible_user_id: number;
  group_id: number;
  status_id: number;
  pipeline_id: number;
  loss_reason_id?: number;
  created_by: number;
  updated_by: number;
  created_at: number;
  updated_at: number;
  closed_at?: number;
  closest_task_at?: number | null;
  is_deleted: boolean;
  custom_fields_values?: any;
  score?: any;
  account_id: number;
  labor_cost?: any;
}

// Mock data based on the example item
const mockLeadsData: Lead[] = [
  {
    id: 12526052,
    name: "Lead #12526052",
    price: 0,
    responsible_user_id: 10898363,
    group_id: 0,
    status_id: 143,
    pipeline_id: 8289155,
    loss_reason_id: 20470803,
    created_by: 0,
    updated_by: 10898363,
    created_at: 1724278641,
    updated_at: 1724298267,
    closed_at: 1724298267,
    closest_task_at: null,
    is_deleted: false,
    custom_fields_values: null,
    score: null,
    account_id: 32490267,
    labor_cost: null
  },
  {
    id: 12526053,
    name: "Lead #12526053",
    price: 1000,
    responsible_user_id: 10898363,
    group_id: 0,
    status_id: 144,
    pipeline_id: 8289155,
    created_by: 0,
    updated_by: 10898363,
    created_at: 1724278700,
    updated_at: 1724298300,
    is_deleted: false,
    custom_fields_values: null,
    score: null,
    account_id: 32490267,
    labor_cost: null
  },
  // Generate additional mock leads
  ...Array.from({ length: 30 }, (_, i) => ({
    id: 12526054 + i,
    name: `Lead #${12526054 + i}`,
    price: Math.floor(Math.random() * 5000),
    responsible_user_id: 10898363,
    group_id: 0,
    status_id: 140 + Math.floor(Math.random() * 5),
    pipeline_id: 8289155,
    created_by: 0,
    updated_by: 10898363,
    created_at: 1724278800 + (i * 100),
    updated_at: 1724298400 + (i * 100),
    is_deleted: false,
    custom_fields_values: null,
    score: null,
    account_id: 32490267,
    labor_cost: null
  }))
];

// Mock data for stage counts
const mockStageData = [
  { _id: { status_id: 143, pipeline_id: 8289155 }, count: 10 },
  { _id: { status_id: 142, pipeline_id: 8289155 }, count: 5 },
  { _id: { status_id: 141, pipeline_id: 8289155 }, count: 8 },
  { _id: { status_id: 144, pipeline_id: 8289155 }, count: 12 },
];

// Simulate an async API call to fetch leads data
export async function fetchLeads(limit = 20, skip = 0): Promise<Lead[]> {
  console.log(`Fetching leads with limit: ${limit}, skip: ${skip}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return paginated data
  return mockLeadsData.slice(skip, skip + limit);
}

// Simulate an async API call to fetch lead by ID
export async function fetchLeadById(id: number): Promise<Lead | null> {
  console.log(`Fetching lead with ID: ${id}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const lead = mockLeadsData.find(lead => lead.id === id);
  return lead || null;
}

// Simulate an async API call to fetch leads by stage
export async function fetchLeadsByStage(): Promise<any[]> {
  console.log('Fetching leads by stage');
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockStageData;
}
