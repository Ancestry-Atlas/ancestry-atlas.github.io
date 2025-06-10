export const tree = [
  {
    id: 1,
    names: ['Joan', 'Manuel'],
    familyNames: [],
  },
  {
    id: 2,
    names: ['Frangelis', 'Eutanacio'],
    familyNames: ['Rangelis'],
    relationship: [
      {
        relationship_id: 3,
        lead_family_name: true,
        addition: true, // adopted, no relationship id since is only one parent
        children: [1]
      },
    ],
  },
  {
    id: 3,
    names: ['Carolina'],
    familyNames: ['Santana'],
    relationship: [{ relationship_id: 2, children: [1] }],
    children: [1],
  },
]