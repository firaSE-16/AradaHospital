"use client"

import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from "@/components/ui/card"
import { 
  Building, 
  Users, 
  User, 
  Stethoscope, 
  Activity, 
  UserCog,
  Clock,
  AlertCircle,
  FlaskConical,
  MapPin,
  Phone,
  Mail,
  ChevronRight
} from "lucide-react"
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const COLORS = ['#5AC5C8', '#2E86AB', '#F18F01', '#C73E1D', '#6C8EAD'];

// Constant data for the hospital
const hospitalData = {
  name: "Arada Hospital",
  location: "Bole, Addis Ababa",
  contactNumber: "+251 90 909 0909",
  email: "info@aradahospital.com",
  totalBeds: 250,
  departments: ["General Medicine", "Pediatrics", "Surgery", "Cardiology", "Neurology"],
  establishedYear: 2010
};

// Constant user counts
const userCounts = {
  Patient: 1245,
  HospitalAdministrator: 12,
  Admin: 5,
  Doctor: 48,
  Receptionist: 18,
  Triage: 8,
  LabTechnician: 6
};

export default function Dashboard() {
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const [activeTab, setActiveTab] = useState('overview');

  // Prepare data for charts
  const userTypeData = [
    { name: 'Patients', value: userCounts.Patient, icon: <User className="h-4 w-4" /> },
    { name: 'Hospital Admins', value: userCounts.HospitalAdministrator, icon: <UserCog className="h-4 w-4" /> },
    { name: 'System Admins', value: userCounts.Admin, icon: <Users className="h-4 w-4" /> },
    { name: 'Doctors', value: userCounts.Doctor, icon: <Stethoscope className="h-4 w-4" /> },
    { name: 'Receptionists', value: userCounts.Receptionist, icon: <User className="h-4 w-4" /> },
    { name: 'Triage', value: userCounts.Triage, icon: <Activity className="h-4 w-4" /> },
    { name: 'Lab Technicians', value: userCounts.LabTechnician, icon: <FlaskConical className="h-4 w-4" /> },
  ].filter(item => item.value > 0);

  const barChartData = [
    { name: 'Patients', count: userCounts.Patient },
    { name: 'Hospital Admins', count: userCounts.HospitalAdministrator },
    { name: 'System Admins', count: userCounts.Admin },
    { name: 'Doctors', count: userCounts.Doctor },
    { name: 'Other Staff', count: userCounts.Receptionist + userCounts.Triage + userCounts.LabTechnician },
  ];

  const refreshData = () => {
    setLastUpdated(new Date().toLocaleTimeString());
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Hospital Management Dashboard</h1>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Clock className="h-3 w-3 mr-1" />
            Last updated: {lastUpdated}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={activeTab === 'overview' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Button>
          <Button 
            variant={activeTab === 'analytics' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </Button>
          <Button variant="outline" size="sm" onClick={refreshData}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Hospital Profile Card */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{hospitalData.name}</CardTitle>
              <CardDescription>{hospitalData.location}</CardDescription>
            </div>
            <Badge variant="secondary">Active</Badge>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Established</p>
              <p className="font-medium">{hospitalData.establishedYear}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Stethoscope className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Beds</p>
              <p className="font-medium">{hospitalData.totalBeds}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Departments</p>
              <p className="font-medium">{hospitalData.departments.length}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Phone className="h-4 w-4 mr-2" />
              {hospitalData.contactNumber}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Mail className="h-4 w-4 mr-2" />
              {hospitalData.email}
            </div>
          </div>
          <Button variant="outline" size="sm">
            View Details <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>

      {activeTab === 'overview' ? (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard 
              title="Patients" 
              value={userCounts.Patient} 
              description="Under care"
              icon={<User className="h-4 w-4" />}
              color="bg-blue-100 text-blue-600"
            />
            <StatCard 
              title="Doctors" 
              value={userCounts.Doctor} 
              description="Medical staff"
              icon={<Stethoscope className="h-4 w-4" />}
              color="bg-green-100 text-green-600"
            />
            <StatCard 
              title="Admissions" 
              value={Math.floor(userCounts.Patient * 0.2)} 
              description="This month"
              icon={<Activity className="h-4 w-4" />}
              color="bg-orange-100 text-orange-600"
            />
            <StatCard 
              title="Staff" 
              value={userCounts.HospitalAdministrator + userCounts.Receptionist + userCounts.Triage + userCounts.LabTechnician} 
              description="Support team"
              icon={<UserCog className="h-4 w-4" />}
              color="bg-purple-100 text-purple-600"
            />
          </div>

          {/* Departments List */}
          <Card>
            <CardHeader>
              <CardTitle>Hospital Departments</CardTitle>
              <CardDescription>Specialized units at {hospitalData.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hospitalData.departments.map((dept, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${COLORS[index % COLORS.length].replace('#', 'bg-')} bg-opacity-20`}>
                        <Stethoscope className={`h-5 w-5 ${COLORS[index % COLORS.length].replace('#', 'text-')}`} />
                      </div>
                      <div>
                        <h3 className="font-medium">{dept}</h3>
                        <p className="text-sm text-muted-foreground">
                          {Math.floor(Math.random() * 10) + 5} doctors
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          {/* Analytics View */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Breakdown of hospital users</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {userTypeData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Counts</CardTitle>
                <CardDescription>Detailed breakdown by category</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barChartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#5AC5C8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Statistics</CardTitle>
              <CardDescription>Comprehensive hospital metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {userTypeData.map((item, index) => {
                  const percentage = (item.value / Math.max(1, Object.values(userCounts).reduce((a, b) => a + b, 0)) * 100);
                  return (
                    <div key={index} className="flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted mr-4">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium">{item.name}</p>
                            <Badge variant="secondary" className="px-2 py-0.5 text-xs">
                              {percentage.toFixed(1)}%
                            </Badge>
                          </div>
                          <p className="text-sm font-medium">{item.value.toLocaleString()}</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: COLORS[index % COLORS.length]
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

const StatCard = ({ title, value, description, icon, color }) => (
  <div className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold mt-1">{value.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
      <div className={`p-3 rounded-lg ${color.split(' ')[0]} ${color.split(' ')[1]}`}>
        {icon}
      </div>
    </div>
  </div>
);