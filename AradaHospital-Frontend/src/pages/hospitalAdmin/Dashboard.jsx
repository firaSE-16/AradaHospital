"use client"

import { useState, useEffect } from "react"
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
  Mail
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
  Cell,
  Label
} from 'recharts'
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const COLORS = ['#5AC5C8', '#2E86AB', '#F18F01', '#C73E1D', '#6C8EAD'];

// Constant hospital data
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
  const [stats, setStats] = useState({
    totalHospitals: 1, // Only Arada Hospital
    userCounts: userCounts,
    loading: false,
    error: null,
    lastUpdated: new Date().toLocaleTimeString()
  });

  // Prepare data for charts
  const userTypeData = [
    { name: 'Patients', value: stats.userCounts.Patient, icon: <User className="h-4 w-4" /> },
    { name: 'Hospital Admins', value: stats.userCounts.HospitalAdministrator, icon: <UserCog className="h-4 w-4" /> },
    { name: 'System Admins', value: stats.userCounts.Admin, icon: <Users className="h-4 w-4" /> },
    { name: 'Doctors', value: stats.userCounts.Doctor, icon: <Stethoscope className="h-4 w-4" /> },
    { name: 'Receptionists', value: stats.userCounts.Receptionist, icon: <User className="h-4 w-4" /> },
    { name: 'Triage', value: stats.userCounts.Triage, icon: <Activity className="h-4 w-4" /> },
    { name: 'Lab Technicians', value: stats.userCounts.LabTechnician, icon: <FlaskConical className="h-4 w-4" /> },
  ].filter(item => item.value > 0);

  const barChartData = [
    { name: 'Patients', count: stats.userCounts.Patient },
    { name: 'Hospital Admins', count: stats.userCounts.HospitalAdministrator },
    { name: 'System Admins', count: stats.userCounts.Admin },
    { name: 'Doctors', count: stats.userCounts.Doctor },
    { name: 'Other Staff', count: stats.userCounts.Receptionist + stats.userCounts.Triage + stats.userCounts.LabTechnician },
  ];

  const refreshData = () => {
    setStats(prev => ({
      ...prev,
      lastUpdated: new Date().toLocaleTimeString()
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Hospital Administration Dashboard</h1>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Clock className="h-3 w-3 mr-1" />
            Last updated: {stats.lastUpdated}
          </div>
        </div>
        <Button variant="outline" onClick={refreshData}>
          Refresh Data
        </Button>
      </div>

      {/* Hospital Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Hospital Information</CardTitle>
          <CardDescription>Key details about {hospitalData.name}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Hospital Name</h3>
              <p className="text-sm text-muted-foreground">{hospitalData.name}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <MapPin className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">Location</h3>
              <p className="text-sm text-muted-foreground">{hospitalData.location}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Phone className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium">Contact</h3>
              <p className="text-sm text-muted-foreground">{hospitalData.contactNumber}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Mail className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-medium">Email</h3>
              <p className="text-sm text-muted-foreground">{hospitalData.email}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium">Departments</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {hospitalData.departments.map((dept, index) => (
                <Badge key={index} variant="outline">
                  {dept}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Beds</span>
              <span className="font-medium">{hospitalData.totalBeds}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Established</span>
              <span className="font-medium">{hospitalData.establishedYear}</span>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Patients" 
          value={stats.userCounts.Patient} 
          description="Registered patients"
          icon={<User className="h-4 w-4" />}
        />

        <StatCard 
          title="Medical Staff" 
          value={stats.userCounts.Doctor} 
          description="Doctors & specialists"
          icon={<Stethoscope className="h-4 w-4" />}
        />

        <StatCard 
          title="Support Staff" 
          value={stats.userCounts.Receptionist + stats.userCounts.Triage + stats.userCounts.LabTechnician} 
          description="Hospital support team"
          icon={<UserCog className="h-4 w-4" />}
        />

        <StatCard 
          title="Administrators" 
          value={stats.userCounts.HospitalAdministrator + stats.userCounts.Admin} 
          description="Hospital management"
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Breakdown of user types in the hospital</CardDescription>
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
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {userTypeData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      stroke="#fff"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} users`, 'Count']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Counts</CardTitle>
            <CardDescription>Number of users by category</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                barSize={40}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="count" 
                  radius={[4, 4, 0, 0]}
                >
                  {barChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const StatCard = ({ title, value, description, icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <div className="h-4 w-4 text-muted-foreground">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value.toLocaleString()}</div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </CardContent>
  </Card>
);